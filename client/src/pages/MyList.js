import React, { useState } from "react";
import ListMap from "../component/list_map";
import PlanInfo from "../component/plan_info";
import "../css/mylist.css";

const MyList = () => {
    const [positions, setPositions] = useState([]);

    return (
        <React.Fragment>
            <PlanInfo setPositions={setPositions} />
            <div className="map_wrap">
                <ListMap positions={positions} />
            </div>
        </React.Fragment>
    )
}

export default MyList;