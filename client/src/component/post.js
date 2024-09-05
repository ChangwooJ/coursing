import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContents, fetchPosts } from "../redux/actions/postActions";
import Maps from "../component/maps";

import "../css/post.css";
import { useParams } from "react-router-dom";
import { fetchPC } from "../redux/actions/post_categoryActions";

const Post_Detail = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const contents = useSelector(state => state.contents.contents);
    const post_category = useSelector(state => state.PC.PC);
    const { post_id } = useParams();
    const id = Number(post_id);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchPosts());
            await dispatch(fetchContents());
            await dispatch(fetchPC());
            setLoading(false);
        };

        fetch();
    }, [dispatch]);

    if(loading){
        return <div>Loading...</div>;
    }

    const post = posts.find(p => p.post_id === id);
    const content = contents.filter(c => c.post_id === id);
    const PC = post_category.filter(pc => pc.post_id === id);

    if (!post) {
        return <div>Loading...</div>;
    }

    console.log(content);

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
                            {content.map(con => (
                                <div className="post_detail_map">
                                    <Maps address={con.address} post={true} />
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