import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContents, fetchPosts } from "../redux/actions/postActions";
import Maps from "../component/maps";
import PlanBanner from "./banner";
import { AddPlan } from "./handlePlan";
import '../css/postList.css';
import 'swiper/css';
import 'swiper/css/navigation';

const PostList = ({ positions }) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const contents = useSelector(state => state.contents.contents);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchContents());
    }, [dispatch]);

    const handleAddPlan = async ({content}) => {
        try {
            await AddPlan({content});
        } catch (error) {
            alert('Failed to add plan.');
        }
    };

    return (
        <React.Fragment>
            <PlanBanner positions={positions} />
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
                                .reverse()
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
                                        <button className="add_plan" onClick={()=> handleAddPlan({content})}>추가하기</button>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <div className="swiper-button-next swiper_bt"></div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    )

}

export default PostList;