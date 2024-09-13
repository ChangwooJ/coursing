import React, { useEffect, useState } from "react";
import PlanInfo from "./plan_info";

const AddPopUp = ({ content, onClose }) => {
    const [positions, setPositions] = useState(null);
    const [schedule, setSchdule] = useState(Array(24).fill({ filled: false, memo: "" })); //24시간 스케쥴

    //전달받은 일정에 맞춰 시간대별 일정 등록
    useEffect(() => {
        if (positions) {
            const newSchdule = Array(24).fill({ filled: false, memo: "" });

            positions.forEach(pos => {
                const { start_time, end_time, memo } = pos;
                for (let i = start_time; i < end_time; i++) {
                    if (i === (end_time + start_time) / 2) {
                        newSchdule[i] = { filled: true, memo }
                    } else newSchdule[i] = { filled: true, memo: "" };
                }
            });

            setSchdule(newSchdule);
        }
    }, [positions]);

    //console.log(positions);
    return (
        <>
            <PlanInfo setPositions={setPositions} contentId={content.content_id} />
            <div className="addPlan_PopUp">
                <h2>일정 추가</h2>
                <div className="schedule_table">
                    {schedule.map((sch, index) => (
                        <>
                            <div
                                key={index}
                                className="time_box"
                                style={{
                                    backgroundColor: sch.filled ? "#FFD700" : "transparent",
                                }}
                            ></div>
                            <div className="memo_box">
                                {sch.memo}
                            </div>{console.log(sch)}
                        </>
                    ))}
                </div>
            </div>
            <button onClick={onClose}>X</button>
        </>
    )
}

export default AddPopUp;