import React from "react";
import PostList from "../component/postList";
import '../css/Main.css';
import "../css/mylist.css";

const Main = () => {
    //post리스트 받아서 map으로 반복. postlist컴포넌트에 post마다의 content전달 혹은 post_id만 전달.
    return (
        <React.Fragment>
            <div className="postlist_wrap">
                <PostList />
            </div>
        </React.Fragment>
    )
}

export default Main;
