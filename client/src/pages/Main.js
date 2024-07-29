import React, { useState } from "react";
import PostList from "../component/postList";
import PlanInfo from "../component/plan_info";
import '../css/Main.css';
import "../css/mylist.css";

const Main = () => {
    const [positions, setPositions] = useState([]);

    return (
        <React.Fragment>
            <PlanInfo setPositions={setPositions} />
            <div>
                <PostList positions={positions} />
            </div>
            <a className="my_plan" href={"/my_plan"}>마이 플랜</a>
        </React.Fragment>
    )
}

export default Main;
