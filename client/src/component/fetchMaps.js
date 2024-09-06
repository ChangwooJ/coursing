import { useEffect, useState } from "react";
import fetchLocations from "./fetchLoc";
import "../css/list_map.css";

const { kakao } = window;

const useFetchMaps = ({ content }) => {
    const [locations, setLocations] = useState([]);  // 위치 상태를 추가
    const [mapDetails, setMapDetails] = useState({ option: {}, markers: [] });
    
    useEffect(() => {
        const fetchLoc = async () => {
            if (content && content.length > 0) {
                const locs = await fetchLocations(content);
                console.log(content);
                if (locs) {
                    setLocations(locs);
                }
            }
        };
        fetchLoc();
    }, [content]);

    useEffect(() => {
        if (locations.length > 0) {
            const options = {
                center: locations[0].latlng,
                level: 4
            };
            
            const markers = locations.map(loc => new kakao.maps.Marker({
                position: loc.latlng,
                clickable: true
            }));

            setMapDetails({
                option: options,
                markers: markers
            });
        }
    }, [locations]);

    return mapDetails;
};

export default useFetchMaps;

/*kakao.maps.event.addListener(map, 'tilesloaded', function() {
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
            });*/