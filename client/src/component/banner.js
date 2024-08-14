import { useEffect, useState } from "react";
import { DeletePlan } from "./handlePlan";

const PlanBanner = ({ positions }) => {
    const [position, setPosition] = useState(positions);

    const hours = Array.from({ length: 25 }, (_, i) => i );

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
            {hours.map(hour => {
                const filterPosition = position.filter(p => p.start_time === hour);
                console.log(filterPosition);
                return (
                    <div key={hour} className="each_hour">
                        <p className="hour">{`${hour}시`}</p>
                        {filterPosition.length > 0 && (
                            <div>
                                <img src={filterPosition[0].category} className="cate_img" />
                                <p>{filterPosition[0].name} {filterPosition[0].memo}</p>
                                <button className="delete_bt" onClick={() => handleDeletePlan(position.list_id)}>X</button>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default PlanBanner;