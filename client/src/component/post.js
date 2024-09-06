import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContents, fetchPosts } from "../redux/actions/postActions";
import useFetchMaps from "./fetchMaps";

import "../css/post.css";
import { useParams } from "react-router-dom";
import { fetchPC } from "../redux/actions/post_categoryActions";

const { kakao } = window;

const Post_Detail = () => {
    const mapContainerRef = useRef(null);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const contents = useSelector(state => state.contents.contents);
    const post_category = useSelector(state => state.PC.PC);
    const { post_id } = useParams();
    const id = Number(post_id);
    const [loading, setLoading] = useState(true);

    const post = posts.find(p => p.post_id === id);
    const content = useMemo(() => contents.filter(c => c.post_id === id), [contents, id]);
    const PC = post_category.filter(pc => pc.post_id === id);
    const { option, markers } = useFetchMaps({ content });

    //console.log("option: ?, markers: ?, mapContainerRef: ?", option, markers, mapContainerRef);

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
            markers.forEach(marker => marker.setMap(map));
        }
    }, [option, markers]);

    if(loading){
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }


    return (
        <React.Fragment>
            <div className="post_detail_wrap">
                <div className="scroll_bar">
                    bar
                </div>
                <div className="post_main_wrap">
                    <div className="post_detail_top">
                        <div className="profile_img"><img src={post.profile_img} /></div>
                        <div className="profile_info">
                            <div>{post.username}</div>
                            {post.name}
                        </div>
                        {PC.map((pc, index) => (
                            <div key={index} className="post_detail_tag">
                                #{pc.category_name}
                            </div>
                        ))}
                    </div>
                    <div className="post_detail_main">
                        <div className="post_detail_title">
                            {post.title}
                        </div>
                        <div className="post_detail_body">
                            <div className="main_map" ref={mapContainerRef} ></div>
                            {content.map(con => (
                                <div className="post_detail_map">
                                    <div className="con_img"><img src={con.img_src} /></div>
                                </div>
                            ))}
                        </div>
                        <div className="post_detail_footer">
                            footer
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Post_Detail;