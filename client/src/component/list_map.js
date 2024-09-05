import React, { useEffect, useRef, useState, useContext } from "react";
import Search from "./search";
import { PositionsContext } from '../context/PositionsContext';
import { LocationContext } from '../context/LocationContext';

const { kakao } = window;

const ListMap = () => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [searchPosition, setSearchPosition] = useState(null);
    const [loc, setLoc] = useState([]);
    const { positions } = useContext(PositionsContext);
    const { location } = useContext(LocationContext);

    useEffect(() => {
        if (positions.length > 0) {
            initializeMap(positions);
        }
    }, [positions]);

    useEffect(() => {
        if(location !== null && map) {
            movePlanPosition();
        }
    }, [location]);

    useEffect(() => {
        if (searchPosition !== null && map) {
            moveSearchPosition();
        }
    }, [searchPosition]);

    const initializeMap = (positions) => {
        if (mapContainerRef.current && positions.length > 0) {
            const container = mapContainerRef.current;
            const options = {
                center: positions[0].latlng,
                level: 4
            };
            const newMap = new kakao.maps.Map(container, options);

            positions.forEach((position) => {
                const marker = new kakao.maps.Marker({
                    position: position.latlng,
                    clickable: true
                });
                marker.setMap(newMap);
            });

            setMap(newMap);
        }
    };

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
        <React.Fragment>
            <div className="map" ref={mapContainerRef}></div>
            <Search setLoc={setLoc} setSearchPosition={setSearchPosition} />
        </React.Fragment>
    );
};

export default ListMap;