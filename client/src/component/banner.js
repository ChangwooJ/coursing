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
            {position.length > 0 && (<p>{position[0].title}</p>)}
            {position.map((position, index) => (
                <div key={index}>
                    <p>{position.name} {position.memo}</p>
                    <button className="delete_bt" onClick={() => handleDeletePlan(position.list_id)}>X</button>
                </div>
            ))}
        </div>
    )
}

export default PlanBanner;