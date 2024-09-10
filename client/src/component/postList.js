import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContents, fetchPosts } from "../redux/actions/postActions";
import { Navigation } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { AddPlan } from "./handlePlan";
import fetchLocations from "./fetchLoc";
import useFetchMaps from "./fetchMaps";
import '../css/postList.css';
import 'swiper/css';
import 'swiper/css/navigation';

const { kakao } = window;

const PostList = () => {    //전달받은 post_id로 content생성 및 표현. 그걸 기반으로 post.js처럼 맵 제공.
    const mapRefs = useRef({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const contents = useSelector(state => state.contents.contents);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [selected, setSelected] = useState(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const { option, markers, overlays } = useFetchMaps({ contents });

console.log(option);
    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchPosts());
            await dispatch(fetchContents());
            setLoading(false);
        };
        fetch();
    }, [dispatch]);

    useEffect(() => {
        const fetchLoc = async () => {
            if (contents.length > 0) {
                const locs = await fetchLocations(contents);
                setLocations(locs);
            }
        };

        fetchLoc();
    }, [contents]);

    useEffect(() => {

    }, [])

    const handleAddPlan = async ({ content }) => {
        try {
            await AddPlan({ content });
        } catch (error) {
            alert('Failed to add plan.');
        }
    };

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <div className="main_wrap">
                {posts.map((post) => {
                    const postLoc = locations.filter(location => location.post_id === post.post_id);
                    const postCon = contents.filter(content => content.post_id === post.post_id)
                    if (postCon.length === 0) {
                        return null;
                    }
                    return (
                        <div key={post.post_id} className="post_wrap">
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
                                    {contents.filter(content => content.post_id === post.post_id)
                                        .map((content, index) => (
                                            <SwiperSlide key={content.id}>
                                                <div className="silde_frame" onClick={() => {navigatePage2Detail(content.post_id)}}>
                                                    <div className="post_content">
                                                        {content.content}
                                                    </div>
                                                    <img
                                                        src={content.img_src}
                                                    />
                                                    <div className="map_wrap">
                                                        <div className="main_map"
                                                            ref={(el) => {
                                                                const key = `${post.post_id}-${index}`;
                                                                mapRefs.current[key] = { element: el, content };
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <button className="add_plan" onClick={() => handleAddPlan({ content })}>추가하기</button>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                            <div className="post_banner_wrap">
                                <p className="post_banner_title">{postCon[0].title}</p>
                                {contents.filter(content => content.post_id === post.post_id)
                                    .map((con, index) => (
                                        <>
                                            <div
                                                key={con.content_id}
                                                className={`post_each_hour ${selected === con.content_id ? "selected" : ""}`}
                                                onClick={() => navigateSlide(post.post_id, index)}
                                            >
                                                <div className="post_banner_num">{index + 1}</div>
                                                <div className="post_middle_wrap">
                                                    {locations[index] && (
                                                        <p className="post_loc_name">{postLoc[index]?.name}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="post_banner_sep">▼</div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>

                    )
                })}
            </div>
        </React.Fragment>
    )

}

export default PostList;