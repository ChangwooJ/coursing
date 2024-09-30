import React, { useEffect, useRef, useState } from "react";
import useFetchMaps from "../etc/fetchMaps";
import fetchLocations from "../etc/fetchLoc";
import axios from "axios";

const { kakao } = window;

const PreviewPost = ({ content, setNewCon, onDeleteContent }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [overlayIdx, setOverlayIdx] = useState(0);
    const { option, markers, overlays } = useFetchMaps({ content: content });
    const [category, setCategory] = useState([]);

    //카테고리 이미지 경로 로드
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/category`);  // 예시 API
                setCategory(response.data);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, []);

    useEffect(() => {
        if (mapContainerRef.current && option.center && markers.length > 0) {
            const map = new kakao.maps.Map(mapContainerRef.current, option);
            mapRef.current = map;
            markers.forEach(marker => marker.setMap(map));  //마커 설정
            overlays.forEach(overlay => overlay.setMap(null));  //오버레이 설정
        }
        //console.log(content);
    }, [option, markers]);

    //오버레이 옵션
    useEffect(() => {
        if (overlays && overlays.length > 0) {
            if (overlayIdx !== null) {
                overlays.forEach((overlay, index) => {
                    if (index === overlayIdx) {
                        overlay.setMap(mapRef.current);
                    } else {
                        overlay.setMap(null);
                    }
                });
            } else {
                overlays.forEach(overlay => overlay.setMap(null));
            }
        }
    }, [overlayIdx, overlays]);

    //선택한 일정 위치 보기
    const handlePosition = async (content, index) => {
        setOverlayIdx(index);
        const loc = await fetchLocations(content);
        if (mapRef.current) {
            mapRef.current.panTo(loc[0].latlng);
        }
    }

    const DeleteContent = (con) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            onDeleteContent(con);
        } else {
            console.log("삭제 취소");
        }
    }

    const AddContent = () => {
        setNewCon(true);
    }

    const FinMakePost = () => {
        //업로드 의사를 전송하고 브라우저에서 백엔드단으로 정보전송처리.
    }

    return (
        <React.Fragment>
            <div className="prePost_bar">
                {content.map((con, index) => {
                    var categoryID = con.cate_id;
                    return (
                        <>
                            <div>
                                <div onClick={() => handlePosition(con, index)}>
                                    <p>{con.name}</p>
                                    <img src={category[categoryID]?.cate_img_src} style={{ width: '20px' }} />
                                </div>
                                <button className="deleteContent" onClick={() => DeleteContent(con)}>-</button>
                            </div>
                            {index < content.length - 1 && (
                                <div className="seperator">
                                    {Array(3).fill().map((_, i) => (
                                            <img key={i} src="/img/하늘원.png" />
                                    ))}
                                </div>
                            )}
                        </>
                    )
                })}
                <div className="seperator">
                    {Array(3).fill().map((_, i) => (
                        <img key={i} src="/img/하늘원.png" />
                    ))}
                </div>
                <button className="addContent" onClick={() => AddContent()}>+</button>
                <button className="finMakePost" onClick={() => FinMakePost()}>업로드</button>
            </div>
            <div className="prePost_map">
                <div className="map" ref={mapContainerRef} ></div>
            </div>
        </React.Fragment>
    )
}

export default PreviewPost;