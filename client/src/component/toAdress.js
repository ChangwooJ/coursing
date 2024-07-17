import axios from "axios";

const Address = () => {
    var address = axios({
        method: "GET",
        url: `https://dapi.kakao.com/v2/local/geo/coord2address.${FORMAT}`,
        headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`,
        },
    });
}