import React, { useEffect, useState } from "react";
import { usePositions } from '../context/PositionsContext';

const AddPopUp = ({ content, onClose }) => {
    const { positions } = usePositions();
    const [schedule, setSchdule] = useState(Array(24).fill({ filled: false, memo: null, count: null, color: "transparent" })); //24시간 스케쥴
    const [addPlanData, setAddPlanData] = useState({
       address: null,
       memo: null,
       content_id: null,
       category: null,
       start_time: null,
       end_time: null, 
    });
    const [time, setTime] = useState({
        start: null,
        end: null,
    });

    //전달받은 일정에 맞춰 시간대별 일정 등록
    useEffect(() => {
        if (positions) {
            const newSchdule = Array(24).fill({ filled: false, memo: null, count: null, color: "transparent"});

            positions.forEach(pos => {
                const { start_time, end_time, memo } = pos;
                const getColor = getRandomColor();
                for (let i = start_time; i < end_time; i++) {
                    if (i === Math.floor((end_time + start_time)/2)) {
                        newSchdule[i] = { filled: true, memo: memo, count: (end_time - start_time), color: getColor }
                    } else newSchdule[i] = { filled: true, memo: "", count: null, color: getColor };
                }
            });

            setSchdule(newSchdule);
        }
    }, [positions]);

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
                    return {
                        ...prevData,
                        end: select
                    };
                }
            } else {
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
        console.log(time);
        
    }, [time]);

    const change = (e) => {
        setAddPlanData({ ...addPlanData, [e.target.name]: e.target.value });
    }

    const handleAddPlan = () => {
        setAddPlanData(prevData => ({
            ...prevData,
            address: content.address,
            category: content.cate_id,
            content_id: content.content_id
        }));
        console.log(addPlanData);
    }

    //console.log(content.address);
    return (
        <>
            <div className="addPlan_PopUp">
                <h2>일정 추가</h2>
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
                            {sch.memo === null && (
                                <div className="null_box"></div>
                            )}
                            {sch.memo && sch.memo !== "" && (<div
                                key={index}
                                className="memo_box"
                                style={{width: `${4.16 * sch.count}%`}}
                            >
                                {sch.memo}
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
                                type="text" name="memo"
                                placeholder="원하는 메모를 입력하세요."
                                value={addPlanData.memo}
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
                        <button onClick={() => handleAddPlan()}>일정 추가하기</button>
                    </div>
                    {console.log(content)}
                </div>
            </div>
            <button onClick={onClose}>X</button>
        </>
    )
}

export default AddPopUp;