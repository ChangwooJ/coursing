import React, { useContext, useEffect, useRef, useState } from "react";
import useFetchMaps from "../etc/fetchMaps";
import fetchLocations from "../etc/fetchLoc";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const { kakao } = window;

const PreviewPost = ({ content, setNewCon, onDeleteContent, onUploadPost }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [overlayIdx, setOverlayIdx] = useState(0);
    const { option, markers, overlays } = useFetchMaps({ content: content });
    const [category, setCategory] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [finState, setFinState] = useState(false);
    const { loading, userInfo } = useContext(AuthContext);

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

    // 카테고리 클릭 시 선택 처리
    const handleCategoryClick = (index) => {
        if (selectedCategories.includes(index)) {
            setSelectedCategories(selectedCategories.filter((item) => item !== index));
        } else if (selectedCategories.length < 3) {
            setSelectedCategories([...selectedCategories, index]);
        }
    };

    const DeleteContent = (con) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            onDeleteContent(con);
        } else {
            console.log("삭제 취소");
        }
    }

    const handleUploadPost = async () => {
        try {
            const title = document.querySelector('.upload_post_title').value;
            const response = await axios.post('http://localhost:8000/api/upload_post', {
                title,
                writer_id: userInfo[0].user_id
            });
            const postId = response.data.post_id;

            await Promise.all(selectedCategories.map(async (sel) => {
                const categoryId = sel + 1;
                await axios.post('http://localhost:8000/api/upload_PC', {
                    post_id: postId,
                    category_id: categoryId
                });
            }));
            onUploadPost(postId);
            alert("업로드 하였습니다.");
        } catch (error) {
            console.error('Error uploading post:', error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
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
                <button className="addContent" onClick={() => { setNewCon(true); }}>+</button>
                <button className="finMakePost" onClick={() => { setFinState(true); }}>업로드</button>
            </div>
            {finState && (
                <div className="upload_info_wrap">
                    <div className="upload_info">
                        <h2 className="title_title">포스트 타이틀</h2>
                        <input type="text" placeholder="title" className="upload_post_title" />
                        <p className="pc_list">포스트의 카테고리를 선택해주세요. (최대 3개)</p>
                        <div className="category_tag_list">
                            {category.map((cate, index) => {
                                const isSelected = selectedCategories.includes(index);
                                return (
                                    <p
                                        className={`cate_tags ${isSelected ? "selected" : ""}`}
                                        onClick={() => handleCategoryClick(index)}
                                    >
                                        {cate.category_name}
                                    </p>
                                )
                            })}
                        </div>
                        <button className="upload_info_reset"
                            onClick={() => {
                                setFinState(false);
                                setSelectedCategories([]);
                            }
                            }
                        >
                            취소
                        </button>
                        <button className="upload_info_fin" type="button" onClick={() => handleUploadPost()}>완료</button>
                    </div>
                </div>
            )}
            <div className="prePost_map">
                <div className="map" ref={mapContainerRef} ></div>
            </div>
        </React.Fragment>
    )
}

export default PreviewPost;