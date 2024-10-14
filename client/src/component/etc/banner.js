import { useState, useContext } from "react";
import { DeletePlan } from "./handlePlan";
import { LocationContext } from "../../context/LocationContext";

import "../../css/banner.css";
import TitleSelect from "./titleSelect";
import axios from "axios";

const PlanBanner = ({ positions, setContentId }) => {
    const { setLocation } = useContext(LocationContext);
    const [selected, setSelected] = useState(null);    //일정의 목록 선택 상태 여부

    const handleDeletePlan = async (list_id) => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmDelete) {
            return;
        }
        try {
            const res = await axios.delete('http://localhost:8000/api/delete_plan', { params: { list_id: list_id } })
            if (res.status === 200) {
                alert('삭제되었습니다.');
                window.location.reload();
            } else {
                alert('삭제 실패: ' + res.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    }

    const changeLoc = (latlng, list_id) => {
        setLocation(latlng);
        setSelected(list_id);
    }

    return (
        <div className="banner_wrap">
            <TitleSelect setContentId={setContentId} />
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
                        <button className="delete_bt" onClick={() => handleDeletePlan(pos.list_id)}>X</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default PlanBanner;