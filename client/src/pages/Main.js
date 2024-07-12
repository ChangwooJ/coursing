import React from "react";
import PostList from "../component/postList";
import '../css/Main.css';

const Main = () => {
    

    return (
        <React.Fragment>
            <div className="post_list">
                <PostList />
            </div>
        </React.Fragment>
    )
}

export default Main;
