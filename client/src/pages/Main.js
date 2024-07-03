import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from "../redux/actions/postActions";

const Main = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    return (
        <React.Fragment>
            <div className="post_list">
                {posts.map((post, idx) => (
                    <div key={post.post_id}>
                        {idx + 1}
                        <h3>{post.title}</h3>
                        <p>{post.user_name}</p>
                    </div>
                ))}
            </div>
        </React.Fragment>
    )

}

export default Main;