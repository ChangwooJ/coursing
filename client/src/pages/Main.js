import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostList from "../component/postList";
import PlanInfo from "../component/plan_info";
import '../css/Main.css';
import "../css/mylist.css";

const Main = () => {
    const [positions, setPositions] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then((response) => {
                alert("로그아웃 되었습니다.");
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <React.Fragment>
            <PlanInfo setPositions={setPositions} />
            <div>
                <PostList positions={positions} />
            </div>
            <a className="my_plan" href={"/my_plan"}>마이 플랜</a>
            <button onClick={handleLogout}>로그아웃</button>
        </React.Fragment>
    )
}

export default Main;
