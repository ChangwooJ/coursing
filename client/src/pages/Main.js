import React, { useState } from "react";
import PostList from "../component/postList";
import PlanInfo from "../component/plan_info";
import '../css/Main.css';
import "../css/mylist.css";

const Main = () => {
    const [positions, setPositions] = useState([]);


    return (
        <React.Fragment>
            <div className="logged_wrap">
            </div>
            <PlanInfo setPositions={setPositions} />
            <div className="postlist_wrap">
                <PostList positions={positions} />
            </div>
        </React.Fragment>
    )
}

export default Main;
