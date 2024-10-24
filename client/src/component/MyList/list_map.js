import React, { useEffect, useRef, useState, useContext } from "react";
import Search from "./search";
import { PositionsContext } from '../../context/PositionsContext';
import { LocationContext } from '../../context/LocationContext';
import useFetchMaps from "../etc/fetchMaps";
import fetchLocations from "../etc/fetchLoc";
import AddPopUp from "../Post/addPopUp";

const { kakao } = window;

const ListMap = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [locations, setLocations] = useState([]);
    const [polyline, setPolyline] = useState(null);
    const { positions } = useContext(PositionsContext);
    const { location } = useContext(LocationContext);
    const [results, setResults] = useState([]);
    const [clickPosition, setClickPosition] = useState(null);
    const [clickId, setClickId] = useState(null);
    const { option, markers } = useFetchMaps({ content: positions });
    const [searchMarkers, setSearchMarkers] = useState([]);
    const [infoWindows, setInfoWindows] = useState([]);
    const [content, setContent] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        if (location !== null && map) {
            movePlanPosition();
        }
    }, [location]);

    useEffect(() => {
        if (results && map) {
            mapSearchPosition();
            map.setCenter(new kakao.maps.LatLng(results[0].y, results[0].x));
        }
    }, [results]);

    useEffect(() => {
        if (clickPosition !== null && map) {
            moveClickPosition();
        }
    }, [clickPosition]);

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

    // 폴리라인 업데이트 함수
    const updatePolyline = () => {
        // 기존의 폴리라인이 존재하면 지도에서 제거
        if (polyline) {
            polyline.setMap(null);
        }

        // 새로운 폴리라인 생성 및 상태 업데이트
        const position = locations.map(loc => loc.latlng);
        const newPolyline = createPolyline(mapRef.current, position);
        setPolyline(newPolyline);
    };

    useEffect(() => {
        // 위치가 변경될 때마다 폴리라인 업데이트
        if (mapRef.current && locations.length > 0) {
            updatePolyline();
        }
    }, [locations]);


    const movePlanPosition = () => {
        map.panTo(location);
    }

    const mapSearchPosition = () => {
        deleteMarkers();    //기존 마커 삭제

        //새로운 검색값에 따른 마커 생성
        const newMarkers = results.map(res => {
            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(res.y, res.x),
                clickable: true
            });

            marker.setMap(map);
            return marker;
        });


        //상태관리
        setSearchMarkers(newMarkers);
    }

    //새로운 검색 값이 반환될때마다 기존 마커,인포 값 제거
    const deleteMarkers = (click) => {
        if (click) {
            infoWindows.forEach((infowindow) => {
                if (infowindow) {
                    infowindow.close();
                }
            });
            setInfoWindows([]);
        }
        else {
            searchMarkers.forEach(marker => {
                marker.setMap(null);
            });
            infoWindows.forEach((infowindow) => {
                if (infowindow) {
                    infowindow.close();
                }
            });
            setSearchMarkers([]);
            setInfoWindows([]);
        }
    }

    //목록에서 클릭 시
    const moveClickPosition = () => {
        map.setCenter(clickPosition);
        deleteMarkers(true);

        //새로운 겁색값에 따른 인포윈도우 생성
        const newInfoWindows = results.map((res, index) => {
            if (
                clickId && res.id === clickId
            ) {
                const iwContent = `
                    <div style="
                        padding: 5px 10px; 
                        width: fit-content;
                        font-size: 14px;;">
                        ${res.place_name}
                    </div>`;
                const iwRemoveable = true;

                const infowindow = new kakao.maps.InfoWindow({
                    content: iwContent,
                    removable: iwRemoveable,
                });

                infowindow.open(map, searchMarkers[index]);
                return infowindow;
            }
        }).filter(infowindow => infowindow !== null);

        setInfoWindows(newInfoWindows);
    }

    const closePopUp = () => {
        setContent(null);
        setShowPopUp(false);
    }

    return (
        <div className="list_map_wrap">
            <div className="map" ref={mapContainerRef}></div>
            {showPopUp && (
                <div className="popup">
                    <div className="popup-content">
                        <AddPopUp content={content} onClose={closePopUp} />
                    </div>
                </div>
            )}
            <Search setResults={setResults} setClickPosition={setClickPosition} setClickId={setClickId} setContent={setContent} setShowPopUp={setShowPopUp} />
        </div>
    );
};

export default ListMap;