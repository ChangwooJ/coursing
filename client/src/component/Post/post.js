import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContents, fetchPosts } from "../../redux/actions/postActions";
import fetchLocations from "../etc/fetchLoc";
import useFetchMaps from "../etc/fetchMaps";

import "../../css/post.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPC } from "../../redux/actions/post_categoryActions";
import AddPopUp from "./addPopUp";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const { kakao } = window;

const Post_Detail = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector(state => state.posts.posts);
    const contents = useSelector(state => state.contents.contents);
    const post_category = useSelector(state => state.PC.PC);
    const { post_id } = useParams();
    const id = Number(post_id);
    const [loading, setLoading] = useState(true);
    const [overlayIdx, setOverlayIdx] = useState(0);
    const [locations, setLocations] = useState([]);
    const [selectedCon, setSelectedCon] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const post = posts.find(p => p.post_id === id);
    const content = useMemo(() => contents.filter(c => c.post_id === id), [contents, id]);
    const PC = post_category.filter(pc => pc.post_id === id);
    const { option, markers, overlays } = useFetchMaps({ content: content });
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchPosts());
            await dispatch(fetchContents());
            await dispatch(fetchPC());
            setLoading(false);
        };

        fetch();
    }, [dispatch]);

    useEffect(() => {
        if (mapContainerRef.current && option.center && markers.length > 0) {
            const map = new kakao.maps.Map(mapContainerRef.current, option);
            mapRef.current = map;
            markers.forEach(marker => marker.setMap(map));  //마커 설정
            overlays.forEach(overlay => overlay.setMap(null));  //오버레이 설정
        }
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

    //선 생성을 위한 전체 좌표 모음
    useEffect(() => {
        const fetchAllLocations = async () => {
            const locs = [];
            for (const con of content) {
                const loc = await fetchLocations(con);
                if (loc && loc.length > 0) {
                    locs.push(...loc);
                }
            }
            setLocations(locs);
        };

        fetchAllLocations();
    }, [content]);

    //선택한 일정 위치 보기
    const handlePosition = async (content, index) => {
        setOverlayIdx(index);
        const loc = await fetchLocations(content);
        if (mapRef.current) {
            mapRef.current.panTo(loc[0].latlng);
        }
    }

    //마커 간의 선 옵션
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
    const markerPos = locations.map(loc => loc.latlng);

    // 선 그리기
    const polyline = createPolyline(mapRef.current, markerPos);

    const handleProfile = (user_id) => {
        navigate(`/profile/${user_id}`);
    }

    //일정 추가 팝업
    const AddPlan = (con) => {
        setSelectedCon(con);
        setShowPopUp(true);
    }

    const closePopUp = () => {
        setSelectedCon(null);
        setShowPopUp(false);
    }

    const toggleOptions = () => {
        setShowOptions(prev => !prev);
    };

    const popUpOption = () => {
        return(
            <div className="option_box">
                {userInfo[0].user_id === content[0].writer_id && (
                    <p onClick={() => deletePost()}>삭제</p>
                )}
            </div>
        )
    }

    const deletePost = async () => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmDelete) {
            return;
        }
        try {
            const res = await axios.delete('http://localhost:8000/api/delete_post', { params: { post_id: id } })
            if (res.status === 200) {
                alert('삭제되었습니다.');
                navigate(-1);
            } else {
                alert('삭제 실패: ' + res.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    }

    if (loading || !post) {
        return <div>Loading...</div>;
    }


    return (
        <React.Fragment>
            <div className="post_detail_wrap">
                <div className="post_detail_top">
                    <div 
                        className="profile_img" 
                        onClick={() => {handleProfile(post.user_id)}}
                    >
                        <img src={post.profile_img} />
                    </div>
                    <div className="profile_info">
                        <div onClick={() => {handleProfile(post.user_id)}}>{post.username}</div>
                        {post.name}
                    </div>
                    {PC.map((pc, index) => (
                        <div key={index} className="post_detail_tag">
                            #{pc.category_name}
                        </div>
                    ))}
                    <div className="post_detail_title">
                        {post.title}
                    </div>
                    <div className="post_detail_option" onClick={() => toggleOptions()}>
                        •••
                    </div>
                    {showOptions && popUpOption()}
                    <div className="next_bar">
                        {content.map((con, index) => (
                            <>
                                <div>
                                    <div onClick={() => handlePosition(con, index)}>
                                        <p>{con.name}</p>
                                        <img src={con.cate_img_src} style={{ width: '20px' }} />
                                    </div>
                                    <button className="addPlan" onClick={() => AddPlan(con)}>+</button>
                                </div>
                                {index < content.length - 1 && (
                                    Array(3).fill().map((_, i) => (
                                        <img key={i} src="/img/하늘원.png" />
                                    ))
                                )}
                            </>
                        ))}
                    </div>
                </div>
                {showPopUp && (
                    <div className="popup">
                        <div className="popup-content">
                            <AddPopUp content={selectedCon} onClose={closePopUp} />
                        </div>
                    </div>
                )}
                <div className="post_detail_main">
                    <div className="post_detail_body">
                        <div className="main_map" ref={mapContainerRef} ></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Post_Detail;