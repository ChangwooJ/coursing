import React, { useContext } from "react";
import { AuthContext } from '../context/AuthContext';

import "../css/my_page.css";

const My_Page = () => {
    const { isAuthenticated, loading, userInfo } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // 로딩 표시 변경 필요
    }

    const handleProfileImg = () => {
        if (userInfo) {
            if (userInfo.profile_img == null) {
                return (
                    <div><img src="img/기본프로필.png" /></div>
                )
            }
            else return <div><img src={userInfo.profile_img} /></div>
        }
    };

    return (
        <React.Fragment>
            <div className="mypage_wrap">
                <div className="info_wrap">
                    <div className="profile">
                        {handleProfileImg()}
                        {userInfo && (
                            <div className="my_info">
                                {console.log(userInfo)}
                                <div className="info_name">{userInfo[0].name}</div>
                                <div className="info_postnum"></div>
                                <button>프로필 설정</button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default My_Page;