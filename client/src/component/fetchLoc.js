import axios from "axios";

const { kakao } = window;

const fetchLocations = async (lists) => {
    const api_key = process.env.REACT_APP_API_KEY;

    const locationsPromises = lists.map(async (list) => {
        if (list.address) {
            try {
                const encodedAddress = encodeURIComponent(list.address);
                const loc_res = await axios({
                    method: "GET",
                    url: `https://dapi.kakao.com/v2/local/search/address.json?query=${encodedAddress}`,
                    headers: {
                        Authorization: `KakaoAK ${api_key}`,
                    },
                });

                if (loc_res.data && loc_res.data.documents.length > 0) {
                    const document = loc_res.data.documents[0];
                    return { 
                        latlng: new kakao.maps.LatLng(document.y, document.x),
                        name: document.road_address ? document.road_address.building_name : '',
                        title: list.user_content_title,
                        memo: list.memo,
                        list_id: list.list_id,
                        category: list.cate_img_src,
                        start_time: list.start_time,
                        end_time: list.end_time,
                        post_id: list.post_id
                    };
                }
            } catch (error) {
                console.error("위치 검색 오류:", error);
            }
        }
        return null;
    });

    const resolvedLocations = await Promise.all(locationsPromises);
    const filteredLocations = resolvedLocations.filter(location => location !== null);

    return filteredLocations;
}

export default fetchLocations;