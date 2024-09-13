import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/actions/postActions";
import PostList from "../component/postList";
import '../css/Main.css';
import "../css/mylist.css";

const Main = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostList = () => {
            dispatch(fetchPosts());
            setLoading(false);
        }
        fetchPostList();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <div className="post_main_wrap">
                {posts.map(post => {
                    return (
                        <div key={post.post_id} className="main_wrap">
                            <PostList post={post} />
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default Main;
