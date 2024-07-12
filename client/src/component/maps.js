import React, { useEffect, useRef } from "react";

const { kakao } = window;

const Maps = ({ lat, lon, id }) => {
    const mapContainerRef = useRef(null);  // useRef를 사용하여 DOM 요소를 참조

    useEffect(() => {
        if (mapContainerRef.current) {  // mapContainerRef.current가 유효할 때만 실행
            const container = mapContainerRef.current;
            const options = {
                center: new kakao.maps.LatLng(lat, lon),
                level: 3
            };
            new kakao.maps.Map(container, options);  // 카카오 지도 초기화
        }
    }, [lat, lon]);  // lat과 lon이 변경될 때마다 effect 실행

    return <div id={id} ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>;  // ref를 div에 설정
};

export default Maps;
