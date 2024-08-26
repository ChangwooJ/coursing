import { useEffect, useState } from "react";
import { DeletePlan } from "./handlePlan";

const PlanBanner = ({ positions }) => {
    const [position, setPosition] = useState(positions);

    const handleDeletePlan = async (list_id) => {
        try {
            await DeletePlan(list_id);
            setPosition(prevPosition => prevPosition.filter(position => position.list_id !== list_id));
        } catch (error) {
            alert('Failed to delete plan.');
        }
    }

    useEffect(() => {
        setPosition(positions);
    }, [positions]);

    return (
        <div className="banner_wrap">
            {position.length > 0 && (<p className="banner_title">{position[0].title}</p>)}
            {position.length > 0 && (
                position.map(pos => (
                    <div key={pos.list_id} className="each_hour">
                        <div className="time_wrap">
                            <p className="start_hour">{`${pos.start_time}시`}</p>
                            <p className="end_hour">{`${pos.end_time}시`}</p>
                        </div>
                        <div className="middle_wrap">
                            <img src={pos.category} className="cate_img" />
                            <p className="loc_name">{pos.name}</p>
                        </div>
                        <button className="delete_bt" onClick={() => handleDeletePlan(position.list_id)}>X</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default PlanBanner;