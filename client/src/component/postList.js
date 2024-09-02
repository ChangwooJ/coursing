import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContents, fetchPosts } from "../redux/actions/postActions";
import Maps from "../component/maps";
import { AddPlan } from "./handlePlan";
import '../css/postList.css';
import 'swiper/css';
import 'swiper/css/navigation';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const contents = useSelector(state => state.contents.contents);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchContents());
    }, [dispatch]);

    const handleAddPlan = async ({ content }) => {
        try {
            await AddPlan({ content });
        } catch (error) {
            alert('Failed to add plan.');
        }
    };

    return (
        <React.Fragment>
            <div className="main_wrap">
                {posts.map((post) => (
                    <div key={post.post_id} className="post_wrap">
                        <h3>{post.title}</h3>
                        <p>{post.user_name}</p>
                        <div className="swiper-button-prev swiper_bt"></div>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation={{
                                prevEl: ".swiper-button-prev",
                                nextEl: ".swiper-button-next"
                            }}
                            pagination={{
                                type: "bullets"
                            }}
                        >
                            {contents.filter(content => content.post_id === post.post_id)
                                .map(content => (
                                    <SwiperSlide key={content.id}>
                                        <div className="silde_frame">
                                            <div className="post_content">
                                                {content.content}
                                            </div>
                                            <img
                                                src={content.img_src}
                                            />
                                            <div className="map_wrap">
                                                <Maps id={`${content.id}`} address={content.address} />
                                            </div>
                                        </div>
                                        <button className="add_plan" onClick={() => handleAddPlan({ content })}>추가하기</button>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <div className="post_banner_wrap">
                            {contents.filter(content => content.post_id === post.post_id)
                                .map(con => (
                                    <div
                                        key={con.content_id}
                                        className={`post_each_hour ${selected === pos.list_id ? "selected" : ""}`}
                                        onClick={() => navigatePage(con.content_id)}
                                    >
                                        <div className="post_time_wrap">
                                            <p className="post_start_hour">{`${con.start_time}시`}</p>
                                            <p className="post_end_hour">{`${con.end_time}시`}</p>
                                        </div>
                                        <div className="post_middle_wrap">
                                            <img src={con.category} className="post_cate_img" />
                                            <p className="post_loc_name">{con.name}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="swiper-button-next swiper_bt"></div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    )

}

export default PostList;