import React, { useEffect, useMemo, useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../redux/actions/listActions";
import { AuthContext } from '../context/AuthContext';

const { kakao } = window;

const PlanInfo = ({setPositions, contentId}) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const dispatch = useDispatch();
    const allLists = useSelector((state) => state.lists.lists);
    const { isAuthenticated, userInfo } = useContext(AuthContext);

    const lists = useMemo(()=>{     //useEffect에 객체 전달로 인한 리랜더링 방지
        if(isAuthenticated && userInfo){
            return allLists.filter(list => list.user_content_id === contentId);
        }
        return [];
    }, [allLists, isAuthenticated, userInfo, contentId]);
    console.log(lists);

    useEffect(() => {
        dispatch(fetchLists());
    }, [dispatch]);

    useEffect(() => {
        if (lists.length > 0) {
            fetchLocations(lists);
        }
    }, [lists, contentId]);

    const fetchLocations = async (lists) => {
        const locationsPromises = lists.map(async (list) => {
            if (list.list_address) {
                try {
                    const encodedAddress = encodeURIComponent(list.list_address);
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
                            end_time: list.end_time
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
        setPositions(filteredLocations);
    }

    return null;
}

export default PlanInfo;