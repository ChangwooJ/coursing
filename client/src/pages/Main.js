import React, { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import PostList from "../component/postList";
import PlanInfo from "../component/plan_info";
import PlanBanner from "../component/banner";
import Header from "../component/header";
import '../css/Main.css';
import "../css/mylist.css";

const Main = () => {
    const [positions, setPositions] = useState([]);
    const [contentId, setContentId] = useState(1);
    const { isAuthenticated, loading, userInfo } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // 로딩 표시 변경 필요
    }

    return (
        <React.Fragment>
            <PlanInfo setPositions={setPositions} contentId={contentId}/>
            <Header isAuthenticated={isAuthenticated} userInfo={userInfo} />
            <PlanBanner positions={positions} setContentId={setContentId} />
            <div className="postlist_wrap">
                <PostList />
            </div>
        </React.Fragment>
    )
}

export default Main;
