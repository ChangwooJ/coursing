import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContents, fetchPosts } from "../redux/actions/postActions";
import Maps from "../component/maps";
import 'swiper/css';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const contents = useSelector(state => state.contents.contents);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchContents());
    }, [dispatch]);

    return (
        <React.Fragment>
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
                                        <div>
                                            <img
                                                src={content.img_src}
                                                style={{ width: '20%', height: '40vh' }}
                                            />
                                            <div style={{ width: '30%', height: '400px' }}>
                                                <Maps id={`${content.id}`} address={content.address} />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <button className="swiper-next swiper_bt">{">"}</button>
                    </div>
                ))}
        </React.Fragment>
    )

}

export default PostList;