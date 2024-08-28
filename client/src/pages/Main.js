import React from "react";
import PostList from "../component/postList";
import '../css/Main.css';
import "../css/mylist.css";

const Main = () => {

    return (
        <React.Fragment>
            <div className="postlist_wrap">
                <PostList />
            </div>
        </React.Fragment>
    )
}

export default Main;
