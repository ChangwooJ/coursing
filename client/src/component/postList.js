import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContents, fetchPosts } from "../redux/actions/postActions";
import Maps from "../component/maps";
import PlanBanner from "./banner";
import { AddPlan } from "./handlePlan";
import '../css/postList.css';
import 'swiper/css';

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
                    <div key={post.post_id}>
                        <h3>{post.title}</h3>
                        <p>{post.user_name}</p>
                        <button className="swiper-prev swiper_bt">{"<"}</button>

                        <Swiper
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation={{
                                prevEl: ".swiper-prev",
                                nextEl: ".swiper-next"
                            }}
                        >
                            {contents.filter(content => content.post_id === post.post_id)
                                .reverse()
                                .map(content => (
                                    <SwiperSlide key={content.id}>
                                        <div className="silde_frame">
                                            <img
                                                src={content.img_src}
                                                style={{ width: '30%', height: '60vh' }}
                                            />
                                            <div className="map_wrap" style={{ border: '1px solid red', width: '50%', height: '400px' }}>
                                                <Maps id={`${content.id}`} address={content.address} />
                                            </div>
                                        </div>
                                        <button className="add_plan" onClick={()=> handleAddPlan({content})}>추가하기</button>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <button className="swiper-next swiper_bt">{">"}</button>
                    </div>
                ))}
            </div>
        </React.Fragment>
    )

}

export default PostList;