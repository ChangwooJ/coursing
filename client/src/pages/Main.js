import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchContents, fetchPosts } from "../redux/actions/postActions";

const Main = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const contents = useSelector(state => state.contents.contents);
    console.log(contents);
    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchContents());
    }, []);

    return (
        <React.Fragment>
            <div className="post_list">
                {posts.map((post) => (
                    <div key={post.post_id}>
                        <h3>{post.title}</h3>
                        <p>{post.user_name}</p>
                        {contents.filter(content => content.post_id === post.post_id)
                        .reverse()
                        .map(contents => (
                            <p key={contents.id}>{contents.content}</p>
                        ))}
                    </div>
                ))}
            </div>
        </React.Fragment>
    )

}

export default Main;