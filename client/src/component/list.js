import React from "react";
import "../css/list.css";

const List = ({ positions }) => {
    console.log(positions);

    return (
        <React.Fragment>
            <div className="list_wrap">
                <p>{positions[0].title}</p>
                {positions.map((position, index) => (
                    <div key={index}>
                        <p>{position.name}</p>
                        <p>{position.memo}</p>
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default List;

//position 전달 제대로 안됨 콘솔에 반복 출력됨