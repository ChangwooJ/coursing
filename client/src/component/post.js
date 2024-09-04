import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import "../css/post.css";

const Post_Detail = () => {
    const { loading, userInfo } = useContext(AuthContext);

    if(!loading){
        return <div>Loading...</div>;
    }

    console.log(userInfo);

    return (
        <React.Fragment>
            <div className="post_detail_wrap">
                <div className="scroll_bar">
                    bar
                </div>
                <div className="post_main_wrap">
                    <div className="post_top">
                        <div className="porfile_img">{userInfo[0].profile_img}</div>
                        profile
                    </div>
                    <div className="post_main">
                        <div className="post_detail_title">
                            title
                        </div>
                        <div className="post_detail_body">
                            body
                        </div>
                        <div className="post_detail_footer">
                            footer
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Post_Detail;