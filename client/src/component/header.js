    import axios from "axios";
    import React, { useEffect, useState } from "react";
    import { useLocation, useNavigate } from "react-router-dom";
    import "../css/header.css";

    const Header = ({ isAuthenticated, userInfo, loading }) => {
        const [logged, setLogged] = useState(false);
        const [menu, setMenu] = useState('/main');
        const navigate = useNavigate();
        const location = useLocation();

        useEffect(() => {
            const path = location.pathname;
            setMenu(path);
        }, [location.pathname]);

        useEffect(() => {
            if (isAuthenticated) {
                setLogged(true);
            } else {
                setLogged(false);
            }
        }, [isAuthenticated]);

        const handleProfileImg = () => {
            if (userInfo) {
                if (userInfo.profile_img == null) {
                    return (
                        <div><img src="/img/기본프로필.png" /></div>
                    )
                }
                else return <div><img src={userInfo.profile_img} /></div>
            }
        };

        const handleLogout = () => {
            axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
                .then((response) => {
                    alert("로그아웃 되었습니다.");
                    navigate('/');
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        const handleLogin = () => {
            navigate('/');
        }

        const handleMenuClick = (menu) => {
            navigate(menu);
        }

        if(!isAuthenticated || !userInfo) {
            return <div className="isNotLogged"><a href="/">로그인</a>을 먼저 해주세요.</div>
        }

        if(loading){
            return <div>Loading...</div>;
        }

        return (
            <React.Fragment>
                <div className="my_banner_wrap">
                    <div className="my_banner">
                            {handleProfileImg()}
                            {userInfo && (<div className="my_name">
                                {userInfo[0].name} 님
                            </div>)}
                        {logged ? (
                            <button onClick={handleLogout}>로그아웃</button>
                        ) : (
                            <button onClick={handleLogin}>로그인</button>
                        )}
                    </div>
                    <div className="banner_category">
                        <button 
                            className={menu === '/main' ? 'active' : ''} 
                            onClick={() => handleMenuClick('/main')}
                        >
                            <img src="/img/홈.png"/>
                        </button>
                        <button 
                            className={menu === '/my_plan' ? 'active' : ''} 
                            onClick={() => handleMenuClick('/my_plan')}
                        >
                            <img src="/img/내 일정.png"/>
                        </button>
                        <button 
                            className={menu === '/chat' ? 'active' : ''} 
                            onClick={() => handleMenuClick('/chat')}
                        >
                            <img src="/img/말풍선.png"/>
                        </button>
                        <button 
                            className={menu === `/profile/${userInfo[0].user_id}` ? 'active' : ''}  
                            onClick={() => handleMenuClick(`/profile/${userInfo[0].user_id}`)}
                        >
                            <img src="/img/마이페이지.png"/>
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    export default Header;