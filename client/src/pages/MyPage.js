import React, { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import Header from "../component/header";
import PlanInfo from "../component/plan_info";
import PlanBanner from "../component/banner";

const MyPage = () => {
    const [positions, setPositions] = useState([]);
    const [contentId, setContentId] = useState(1);
    const { isAuthenticated, loading, userInfo } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // 로딩 표시 변경 필요
    }

    return (
        <React.Fragment>
            <PlanInfo setPositions={setPositions} contentId={contentId} />
            <Header isAuthenticated={isAuthenticated} userInfo={userInfo} />
            <PlanBanner positions={positions} setContentId={setContentId} />

        </React.Fragment>
    )
}

export default MyPage;