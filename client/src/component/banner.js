import { useEffect, useState, useContext, useMemo } from "react";
import { DeletePlan } from "./handlePlan";
import { useDispatch, useSelector } from "react-redux";
import { fetchTitles } from "../redux/actions/listActions";
import { AuthContext } from '../context/AuthContext';
import { LocationContext } from "../context/LocationContext";

import "../css/banner.css";

const { kakao } = window;

const PlanBanner = ({ positions, setContentId }) => {
    const dispatch = useDispatch();
    const titles = useSelector((state) => state.titles.titles);
    const { isAuthenticated, userInfo } = useContext(AuthContext);
    const { setLocation } = useContext(LocationContext);
    const [view, setView] = useState(false);    //드롭다운 상태관리
    const [selected, setSelected] = useState(null);    //일정의 목록 선택 상태 여부
    const [initTitle, setInitTitle] = useState("일정을 선택해주세요");

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

    const handleDeletePlan = async (list_id) => {
        try {
            await DeletePlan(list_id);
        } catch (error) {
            alert('Failed to delete plan.');
        }
    }

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

    const changeLoc = (latlng, list_id) => {
        setLocation(latlng);
        setSelected(list_id);
    }

    return (
        <div className="banner_wrap">
            <ul 
                className={`banner_title ${view ? "clicked" : ""}`} 
                onClick={() => setView(!view)}
            >
                <p className="down">▼</p>
                {initTitle}
                {view && drop()}
            </ul>
            {positions.length > 0 && (
                positions.map(pos => (
                    <div 
                        key={pos.list_id} 
                        className={`each_hour ${selected === pos.list_id ? "selected": ""}`} 
                        onClick={() => changeLoc(pos.latlng, pos.list_id)}
                    >
                        <div className="time_wrap">
                            <p className="start_hour">{`${pos.start_time}시`}</p>
                            <p className="end_hour">{`${pos.end_time}시`}</p>
                        </div>
                        <div className="middle_wrap">
                            <img src={pos.category} className="cate_img" />
                            <p className="loc_name">{pos.name}</p>
                        </div>
                        <button className="delete_bt" onClick={() => handleDeletePlan(positions.list_id)}>X</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default PlanBanner;