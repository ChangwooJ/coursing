import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchTitles } from "../../redux/actions/listActions";

import "../../css/titleSelect.css";

const TitleSelect = ({setContentId}) => {
    const dispatch = useDispatch();
    const titles = useSelector((state) => state.titles.titles);
    const { isAuthenticated, userInfo, loading } = useContext(AuthContext);
    const [initTitle, setInitTitle] = useState("일정을 선택해주세요");
    const [view, setView] = useState(false);    //드롭다운 상태관리

    const titleList = useMemo(() => {     //useEffect에 객체 전달로 인한 리랜더링 방지, user_content_title객체
        if (isAuthenticated && userInfo) {
            return titles.filter(title => title._user_id === userInfo[0].user_id);
        }
        return [];
    }, [titles, isAuthenticated, userInfo]);

    useEffect(() => {
        if (titleList.length > 0) {
            setInitTitle(titleList[0].user_content_title);
        }
    }, [titleList]);

    useEffect(() => {
        dispatch(fetchTitles());
    }, [dispatch]);

    const handlePlan = (user_content_title, user_content_id) => {
        setInitTitle(user_content_title);
        setContentId(user_content_id);
    }

    const drop = () => {
        return titleList.map(tL => (
            <li
                className="title_li"
                key={tL.user_content_id}
                onClick={() => handlePlan(tL.user_content_title, tL.user_content_id)}
            >
                <button>{tL.user_content_title}</button>
            </li>
        ))
    }

    if(loading){
        return <div>Loading...</div>;
    }

    return (
        <ul
            className={`banner_title ${view ? "clicked" : ""}`}
            onClick={() => setView(!view)}
        >
            {initTitle}
            {view && drop()}
            <p className="down">▼</p>
        </ul>
    )
}

export default TitleSelect;