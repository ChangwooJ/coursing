import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../redux/actions/listActions";
import List from "./list";
import "../css/list_map.css";

const { kakao } = window;

const ListMap = () => {
    const mapContainerRef = useRef(null);
    const [positions, setPositions] = useState([]);
    const api_key = process.env.REACT_APP_API_KEY;

    const dispatch = useDispatch();
    const allLists = useSelector((state) => state.lists.lists);
    const lists = useMemo(()=>{     //useEffect에 객체 전달로 인한 리랜더링 방지
        return allLists.filter(list => list.user_content_id === 1);
    }, [allLists]);
    //console.log(lists);

    useEffect(() => {
        dispatch(fetchLists());
    }, [dispatch]);

    useEffect(() => {
        if (lists.length > 0) {
            fetchLocations(lists);
        }
    }, [lists]);

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

                    if (loc_res.data.documents.length > 0) {
                        const document = loc_res.data.documents[0];
                        //console.log(document);
                        return { 
                            latlng: new kakao.maps.LatLng(document.y, document.x),
                            name: document.road_address ? document.road_address.building_name : '',
                            title: list.user_content_title,
                            memo: list.memo
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

        if (filteredLocations.length > 0) {
            initializeMap(filteredLocations);
        }
    };

    const initializeMap = (positions) => {
        if (mapContainerRef.current && positions.length > 0) {
            const container = mapContainerRef.current;
            const options = {
                center: positions[0].latlng,
                level: 6
            };
            const map = new kakao.maps.Map(container, options);

            positions.forEach((position) => {
                const marker = new kakao.maps.Marker({
                    position: position.latlng,
                    clickable: true
                });
                marker.setMap(map);
            });
        }
    };

    return (
        <React.Fragment>
            <div className="map" ref={mapContainerRef}></div>
            <List positions={positions} />
        </React.Fragment>
    );
};

export default ListMap;

//useEffect와 객체간의 관계, 얕은 비교, 참조값, 무한루프를 위한 useMemo사용