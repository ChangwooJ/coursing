import React from "react";
import "../css/detailLoc.css";

const DetailLoc = ({ position }) => {

    return(
        <React.Fragment>
            <div className="detail_comp">
                <p>{position.name}</p>
                <p>{position.memo}</p>
            </div>
        </React.Fragment>
    )
}

export default DetailLoc;