import React, { useContext, useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContents } from "../../redux/actions/postActions";
import { Navigation } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import PostMap from "./postMap";
import '../../css/postList.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const PostList = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contents = useSelector(state => state.contents.contents);
    const content = useMemo(() => contents.filter(c => c.post_id === post.post_id), [contents, post.post_id]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const { userInfo } = useContext(AuthContext);
    const [commending, setCommending] = useState(false);

    useEffect(() => {
        const fetch = () => {
            dispatch(fetchContents());
            setLoading(false);
        };
        fetch();
    }, [dispatch]);

    useEffect(() => {
        const fetchRecommend = async () => {
            try {
                const response = await axios.post(`http://localhost:8000/api/getRecommend`, {
                    params: {
                        viewed_post_id: post.post_id,
                        user_id: userInfo[0].user_id
                    }
                });
    
                if (response.data.recommend === 1) {
                    setCommending(true);
                } else {
                    setCommending(false);
                }
            } catch (err) {
                console.error("Error saving viewed post:", err);
            }
        }
    
        fetchRecommend();
    }, [post]);

    const navigateSlide = (postId, index) => {
        if (swiperInstance) {
            swiperInstance[postId].slideTo(index);
        }
        setSelected(index);
    }

    const navigatePage2User = (user_id) => {
        navigate(`/profile/${user_id}`);
    }

    const navigatePage2Detail = async (post_id) => {
        try {
            await axios.post(`http://localhost:8000/api/viewedPost`, {
                viewed_post_id: post_id,
                user_id: userInfo[0].user_id
            });
    
            navigate(`/post/${post_id}`);
        } catch (err) {
            console.error("Error saving viewed post:", err);
        }
    }

    const handleMapDetail = () => {
        navigate('/my_plan');
    }

    const handleCommend = async (commending) => {
        if (!commending) {
            try {
                await axios.post(`http://localhost:8000/api/recommmended`, {
                    viewed_post_id: post.post_id,
                    user_id: userInfo[0].user_id
                });
                setCommending(true);
            } catch (err) {
                console.error("Error saving viewed post:", err);
            }
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }
console.log(post.commended);
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
                    <p className="post_commended" onClick={() => handleCommend(commending)}><p className={`commend_shape ${commending ? "true": ""}`}>★</p>{post.commended}</p>
                </div>
            </div>
        </React.Fragment>
    )

}

export default PostList;