import React, { useEffect, useRef, useState } from "react";
import DetailLoc from "./detailLoc";
import "../css/list_map.css";

const { kakao } = window;

const ListMap = ({ positions }) => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [selPosition, setSelPosition] = useState(null);
    const [button, setButton] = useState(">");
    const [temp, setTemp] = useState(null);
    const [btPosition, setBtPosition] = useState('left');

    useEffect(() => {
        if (positions.length > 0) {
            initializeMap(positions);
        }
    }, [positions]);

    useEffect(()=>{
        if(selPosition === null){
            setButton(">");
            setBtPosition('left');
        } else {
            setButton("<");
            setBtPosition('right');
        }
    })

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

    const viewPlan = ( index ) => {
        map.panTo(positions[index].latlng);
        //panTo에 option을 줄 수 있음. 화면 이동시 해당 요소로의 확대(level의 변경)가 필요해보임
        setSelPosition(positions[index]);
    }

    const transition = () => {
        if(selPosition !== null){
            setTemp(selPosition);
            setSelPosition(null);
        } else {
            setSelPosition(temp);
        }
    }

    return (
        <React.Fragment>
            <div className="map" ref={mapContainerRef}></div>
            <div className="list_wrap">
                {positions.length > 0 && (<p>{positions[0].title}</p>)}
                {positions.map((position, index) => (
                    <button key={index} onClick={() => viewPlan(index)}>
                        <p>{position.name}</p>
                        <p>{position.memo}</p>
                    </button>
                    //building_name이 없는 경우의 문제
                ))}
            </div>
            {selPosition && <DetailLoc position={selPosition} />}
            <div className="bt_Wrap">
                <button 
                className="close_bt" 
                onClick={()=>transition()} 
                style={{
                    [btPosition]: selPosition === null ? '20%' : '40%'
                }}>
                    {button}
                </button>
            </div>
        </React.Fragment>
    );
};

export default ListMap;