import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContents } from "../redux/actions/postActions";
import { Navigation } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { AddPlan } from "./handlePlan";
import fetchLocations from "./fetchLoc";
import PostMap from "./postMap";
import '../css/postList.css';
import 'swiper/css';
import 'swiper/css/navigation';


const PostList = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contents = useSelector(state => state.contents.contents);
    const content = useMemo(() => contents.filter(c => c.post_id === post.post_id), [contents, post.post_id]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
        const fetch = () => {
            dispatch(fetchContents());
            setLoading(false);
        };
        fetch();
    }, [dispatch]);

    const navigateSlide = (postId, index) => {
        if (swiperInstance) {
            swiperInstance[postId].slideTo(index);
        }
        setSelected(index);
    }

    const navigatePage2User = (user_id) => {
        navigate(`/profile/${user_id}`);
    }

    const navigatePage2Detail = (post_id) => {
        navigate(`/post/${post_id}`);
    }

    const handleMapDetail = (address) => {
        navigate('/my_plan');
        //일반 지도처럼 상세 정보, 리뷰 등을 보여줄 수 있는 기능 제작 후 수정.
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <div className="post_wrap">
                <div className="content_wrap">
                    <div className="post_top" onClick={() => navigatePage2User(post.user_id)}>
                        <img src={post.profile_img} />
                        <div className="post_user_info">
                            <p className="info_id">{post.username}</p>
                            <p>{post.name}</p>
                        </div>
                    </div>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        pagination={{
                            type: "bullets"
                        }}
                        onSwiper={(swiper) => setSwiperInstance(prev => ({ ...prev, [post.post_id]: swiper }))}
                        modules={[Navigation]}
                    >
                        {content.map((con) => (
                            <SwiperSlide key={con.id}>
                                <div className="silde_frame">
                                    <div className="post_content" onClick={() => { navigatePage2Detail(con.post_id) }}>
                                        {con.content}
                                    </div>
                                    <div className="content_info">
                                        <img
                                            src={con.img_src}
                                        />
                                        {console.log(con)}
                                        <div className="loc_map" onClick={() => { handleMapDetail(con.address) }}>
                                            <PostMap content={con} />
                                            <div className="loc_info">
                                                <div className="loc_name">{con.name}</div>
                                                <div className="loc_address">{con.address}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div className="post_banner_wrap">
                    <p className="post_banner_title">{post.title}</p>
                    {content.map((con, index) => (
                            <>
                                <div
                                    key={con.content_id}
                                    className={`post_each_hour ${selected === con.content_id ? "selected" : ""}`}
                                    onClick={() => navigateSlide(post.post_id, index)}
                                >
                                    <div className="post_banner_num">{index + 1}</div>
                                    <div className="post_middle_wrap">
                                        <p className="post_loc_name">{con.name}</p>
                                    </div>
                                </div>
                                <div className="post_banner_sep">▼</div>
                            </>
                        ))
                    }
                </div>
            </div>
        </React.Fragment>
    )

}

export default PostList;