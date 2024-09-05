import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/list_map.css";

const { kakao } = window;

const Maps = ({ address, post }) => {
    const mapContainerRef = useRef(null);  // useRef를 사용하여 DOM 요소를 참조
    const [location, setLocation] = useState(null);  // 위치 상태를 추가
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const api_key = process.env.REACT_APP_API_KEY;  //api_key .env파일 활용

    const fetchLocation = async () => {
        if (address) {
            try {
                const encodedAddress = encodeURIComponent(address);
                const loc_res = await axios({
                    method: "GET",
                    url: `https://dapi.kakao.com/v2/local/search/address.json?query=${encodedAddress}`,
                    headers: {
                        Authorization: `KakaoAK ${api_key}`,
                    },
                });

                if (loc_res.data.documents.length > 0) {
                    const document = loc_res.data.documents[0];
                    setLat(document.y);
                    setLon(document.x);
                    setLocation(document);
                }
            } catch (error) {
                console.error("위치 검색 오류:", error);
            }
        }
    };

    //REST API를 이용해 주소 위치의 정보를 가져옴
    useEffect(() => {
        fetchLocation();
    }, [address]);

    useEffect(() => {
        if (location) {
            maps();
        }
    }, [location]);  // lat과 lon이 변경될 때마다 effect 실행

    const maps = () => {
        if (mapContainerRef.current) {  // mapContainerRef.current가 유효할 때만 실행
            const container = mapContainerRef.current;
            const options = {
                center: new kakao.maps.LatLng(lat, lon),
                level: 4
            };
            var map = new kakao.maps.Map(container, options);  // 카카오 지도 초기화

            var markerPosition = new kakao.maps.LatLng(lat, lon);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: markerPosition,
                clickable: true
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
            /*var iwContent = `<div>${location.road_address.building_name}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
            */
            /* 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable
            });*/

            /* 마커 위에 인포윈도우를 표시합니다
            infowindow.open(map, marker);

            map.setZoomable(false);*/

            kakao.maps.event.addListener(map, 'tilesloaded', function() {
                // 현재 지도의 중심 좌표 가져오기
                var center = map.getCenter();
            
                // 새로운 중심 좌표를 계산 (오른쪽으로 20% 이동)
                var moveLatLon = new kakao.maps.LatLng(center.getLat(), center.getLng() - (map.getBounds().getSouthWest().getLng() - center.getLng()) * 0.3);
            
                // 애니메이션 없이 바로 중심을 설정
                if(post){
                    map.setCenter(moveLatLon);
                    map.setZoomable(false);
                    map.setDraggable(false);
                }
            });
        }
    }

    return <div className="main_map" ref={mapContainerRef} ></div>;  // ref를 div에 설정
};

export default Maps;
