import React, { useEffect, useRef } from "react";
import useFetchMaps from "../etc/fetchMaps";

const { kakao } = window;

const PostMap = ({content}) => {
    const mapContainerRef = useRef(null);
    const { option, markers } = useFetchMaps({ content });

    useEffect(() => {
        if (mapContainerRef.current && option.center && markers.length > 0) {
            const map = new kakao.maps.Map(mapContainerRef.current, option);
            markers.forEach(marker => marker.setMap(map));
        }
    }, [option, markers]);


    return (
        <div className="map_wrap">
            <div className="main_map" ref={mapContainerRef} ></div>
        </div>
    )
}

export default PostMap;