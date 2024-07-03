import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        user_id: '',
        user_pw: '',
    });

    const change = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }
    
    const checkUser = (e) => {
        e.preventDefault();
        navigate('/main');
    }

    return(
        <login>
            <div className="login_wrap">
                <h2>로그인</h2>
                <form onSubmit={checkUser}>
                    <div className="login_form">
                        <p><input
                            className="login id"
                            type="text" name="user_id"
                            placeholder="아이디를 입력해주세요."
                            value={loginData.user_id}
                            onChange={change}
                        /></p>
                        <p><input
                            className="login pw"
                            type="password" name="user_pw"
                            placeholder="비밀번호를 입력해주세요."
                            value={loginData.user_pw}
                            onChange={change}
                        /></p>
                    </div>
                    <div className="find_my_account">
                        <a href="/find_my/id">아이디 찾기</a>
                        <div className="separator"></div>
                        <a href="/find_my/pw">비밀번호 찾기</a>
                    </div>
                    <div className="login_bt_wrap">
                        <input className="login_bt" type="submit" value="로그인" />
                        <input className="sign_up" type="button" value="회원가입" />
                    </div>
                </form>
            </div>
        </login>
    )
}

export default Login;