import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../../redux/actions/listActions";
import { fetchTitles } from "../../redux/actions/listActions";

const AddPopUp = ({ content, onClose }) => {
    const { isAuthenticated, userInfo, loading } = useContext(AuthContext);
    const dispatch = useDispatch();
    const allLists = useSelector((state) => state.lists.lists);
    const titles = useSelector((state) => state.titles.titles);
    const [contentId, setContentId] = useState(1);
    const positions = useMemo(() => {     //useEffect에 객체 전달로 인한 리랜더링 방지
        if (isAuthenticated && userInfo) {
            return allLists.filter(list => list.user_content_id === contentId);
        }
        return [];
    }, [allLists, isAuthenticated, userInfo, contentId]);

    const titleList = useMemo(() => {     //useEffect에 객체 전달로 인한 리랜더링 방지, user_content_title객체
        if (isAuthenticated && userInfo) {
            return titles.filter(title => title._user_id === userInfo[0].user_id);
        }
        return [];
    }, [titles, isAuthenticated, userInfo]);
    const [initTitle, setInitTitle] = useState("일정을 선택해주세요");
    const [view, setView] = useState(false);    //드롭다운 상태관리

    const [schedule, setSchdule] = useState(Array(24).fill({ filled: false, name: null, count: null, color: "transparent" })); //24시간 스케쥴
    const [addPlanData, setAddPlanData] = useState({
        address: null,
        name: "",
        content_id: null,
        category: null,
        start_time: null,
        end_time: null,
    });
    const [time, setTime] = useState({
        start: null,
        end: null,
    });

    useEffect(() => {
        dispatch(fetchLists());
        dispatch(fetchTitles());
    }, [dispatch]);

    useEffect(() => {
        if (titleList.length > 0) {
            setInitTitle(titleList[0].user_content_title);
        }
    }, [titleList]);

    //전달받은 일정에 맞춰 시간대별 일정 등록
    useEffect(() => {
        if (positions) {
            const newSchdule = Array(24).fill({ filled: false, name: null, count: null, color: "transparent" });

            positions.forEach(pos => {
                const { start_time, end_time, name } = pos;
                const getColor = getRandomColor();
                for (let i = start_time; i < end_time; i++) {
                    if (i === Math.floor((end_time + start_time) / 2)) {
                        newSchdule[i] = { filled: true, name: name, count: (end_time - start_time), color: getColor }
                    } else newSchdule[i] = { filled: true, name: "", count: null, color: getColor };
                }
            });

            setSchdule(newSchdule);
        }
    }, [positions]);

    const handlePlan = (user_content_title, user_content_id) => {
        setInitTitle(user_content_title);
        setContentId(user_content_id);
    }

    //일정 선택
    const drop = () => {
        return titleList.map(tL => (
            <li
                className="add_title_li"
                key={tL.user_content_id}
                onClick={() => handlePlan(tL.user_content_title, tL.user_content_id)}
            >
                <button>{tL.user_content_title}</button>
            </li>
        ))
    }

    //랜덤 색상 함수
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    //시간대 클릭
    const catchTime = (select) => {
        setTime(prevData => {
            if (prevData.start === null) {
                selectColor(null, select, null);  //시작 지점 표시
                return {
                    ...prevData,
                    start: select,
                    end: null
                };
            } else if (prevData.start !== null && prevData.end === null) {
                let conflict = false;
                positions.forEach(pos => {
                    const { start_time, end_time } = pos;
                    if ((prevData.start < end_time && select > start_time) || (select <= end_time && select >= start_time)) {
                        conflict = true;
                    }
                });

                if (!conflict) {
                    selectColor(prevData.start, select, null);    //선택 시간대 표시
                    return {
                        ...prevData,
                        end: select
                    };
                } else {
                    alert("다른 일정과 중복되는 시간대가 존재합니다.");
                    return {
                        start: null,
                        end: null,
                    };
                }
            } else {
                selectColor(prevData.start, prevData.end, select);    //시간대 표시 초기화
                return {
                    start: select,
                    end: null
                };
            }
        });
    }

    //시간대 클릭 반영
    useEffect(() => {
        setAddPlanData(prevData => ({
            ...prevData,
            start_time: time.start,
            end_time: time.end
        }));
    }, [time]);

    const change = (e) => {
        setAddPlanData({ ...addPlanData, [e.target.name]: e.target.value });
    }

    //일정 추가
    const handleAddPlan = async () => {
        const updatedData = {
            ...addPlanData,
            address: content.address,
            category: content.cate_id,
            content_id: contentId
        };

        try {
            const res = await axios.post('http://localhost:8000/api/add_plan', updatedData, {
                withCredentials: true
            });

            if (res.status === 200) {
                alert('추가되었습니다.');
                onClose();
                window.location.reload();
            }

        } catch (error) {
            alert('에러가 발생했습니다.');
            console.error(error);
        }
    }

    //시간대 선택 색상
    const selectColor = (start, end, init) => {
        const newSchedule = [...schedule];
        const color = "skyblue";

        if (start === null) {
            newSchedule[end] = { filled: true, name: null, count: null, color: color };
        } else if (end !== null) {
            for (let i = start; i <= end; i++) {
                newSchedule[i] = { filled: true, name: null, count: null, color: color };
            }
        }

        if (init !== null) {
            for (let i = start; i <= end; i++) {
                newSchedule[i] = { filled: false, name: null, count: null, color: "transparent" };
            }
            newSchedule[init] = { filled: true, name: null, count: 1, color: color };
        }

        setSchdule(newSchedule);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div className="addPlan_PopUp">
                <div className="notLoggged"><a href="/">로그인</a>을 먼저 해주세요.</div>
            </div>
        )
    }

    return (
        <>
            <div className="addPlan_PopUp">
                <div className="popup_title">
                    <h2>일정 추가</h2>
                    <button className="close_popup" onClick={onClose}>x</button>
                </div>
                <ul
                    className={`add_banner_title ${view ? "clicked" : ""}`}
                    onClick={() => setView(!view)}
                >
                    <p className="add_down">▼</p>
                    {initTitle}
                    {view && drop()}
                </ul>
                <div className="schedule_table">
                    {schedule.map((sch, index) => (
                        <div
                            key={index}
                            className="time_box"
                            style={{
                                backgroundColor: sch.filled ? sch.color : "transparent",
                            }}
                            onClick={() => !sch.filled && catchTime(index)}
                        ></div>
                    ))}
                    {schedule.map((sch, index) => (
                        <>
                            {sch.name === null && (
                                <div className="null_box"></div>
                            )}
                            {sch.name && sch.name !== "" && (<div
                                key={index}
                                className="memo_box"
                                style={{ width: `${4.16 * sch.count}%` }}
                            >
                                {sch.name}
                            </div>
                            )}
                        </>
                    ))}
                </div>
                <div className="add_content_wrap">
                    <img src={content.img_src} />
                    <div className="add_content">
                        <p>장소명: {content.name}</p>
                        <p>주소: {content.address}</p>
                        <p>메모:
                            <input
                                className="memo"
                                type="text" name="name"
                                placeholder="원하는 메모를 입력하세요."
                                value={addPlanData.name}
                                onChange={change}
                            />
                        </p>
                        <p>시간:
                            <input
                                className="start_time"
                                type="text" name="start_time"
                                placeholder="00"
                                value={addPlanData.start_time}
                                onChange={change}
                            />
                            -
                            <input
                                className="end_time"
                                type="text" name="end_time"
                                placeholder="00"
                                value={addPlanData.end_time}
                                onChange={change}
                            />
                        </p>
                        <div className="button_box">
                            <button onClick={() => handleAddPlan()}>일정 추가하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPopUp;