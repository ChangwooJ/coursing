import React, { useEffect, useRef, useState, useContext } from "react";
import Search from "./search";
import { PositionsContext } from '../context/PositionsContext';
import { LocationContext } from '../context/LocationContext';
import useFetchMaps from "./fetchMaps";
import fetchLocations from "./fetchLoc";

const { kakao } = window;

const ListMap = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [searchPosition, setSearchPosition] = useState(null);
    const [loc, setLoc] = useState([]);
    const [locations, setLocations] = useState([]);
    const { positions } = useContext(PositionsContext);
    const { location } = useContext(LocationContext);
    const { option, markers } = useFetchMaps({ content: positions });

    useEffect(() => {
        if (location !== null && map) {
            movePlanPosition();
        }
    }, [location]);

    useEffect(() => {
        if (searchPosition !== null && map) {
            moveSearchPosition();
        }
    }, [searchPosition]);

    useEffect(() => {
        if (mapContainerRef.current && option.center && markers.length > 0) {
            const newMap = new kakao.maps.Map(mapContainerRef.current, option);
            mapRef.current = newMap;
            setMap(newMap);
            markers.forEach(marker => marker.setMap(newMap));  //마커 설정
        }
    }, [option, markers]);

    //선 생성 좌표 모음
    useEffect(() => {
        const fetchAllLocations = async () => {
            const locs = [];
            for (const con of positions) {
                const loc = await fetchLocations(con);
                if (loc && loc.length > 0) {
                    locs.push(...loc);
                }
            }
            setLocations(locs);
        };

        fetchAllLocations();
    }, [positions]);

    const createPolyline = (map, positions) => {
        const polyline = new kakao.maps.Polyline({
            path: positions,
            strokeWeight: 3,
            strokeColor: '#FF0000',
            strokeOpacity: 0.7,
            strokeStyle: 'solid'
        });

        polyline.setMap(map);
        return polyline;
    };

    // 마커의 위치를 저장
    const position = locations.map(loc => loc.latlng);

    // 선 그리기
    const polyline = createPolyline(mapRef.current, position);

    const movePlanPosition = () => {
        map.panTo(location);
    }

    const moveSearchPosition = () => {
        map.panTo(searchPosition);

        // 마커 생성
        var marker = new kakao.maps.Marker({
            position: searchPosition,
            clickable: true
        });

        marker.setMap(map);

        var iwContent = `<div>${loc.place_name}</div>`,
            iwRemoveable = true;

        // 인포윈도우 생성
        var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable
        });

        infowindow.open(map, marker);

    }

    return (
        <div className="list_map_wrap">
            <div className="map" ref={mapContainerRef}></div>
            <Search setLoc={setLoc} setSearchPosition={setSearchPosition} />
        </div>
    );
};

export default ListMap;