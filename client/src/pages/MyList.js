import React from "react";
import ListMap from "../component/list_map";
import "../css/mylist.css";

const MyList = () => {
    return (
        <React.Fragment>
            <div className="map_wrap">
                <ListMap />
            </div>
        </React.Fragment>
    )
}

export default MyList;