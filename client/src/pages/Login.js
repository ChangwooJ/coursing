import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const change = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    const checkUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', loginData, {
            withCredentials: true
        })
        .then((response) => {
            if (response.status === 200) {
                alert(`환영합니다. ${loginData.username}님`);
                navigate('/main');
            }
        })
        .catch((error) => {
            alert("아이디 또는 비밀번호를 확인해주세요.");
            console.error(error);
        });
    }

    return(
        <div className="login_wrap">
            <form onSubmit={checkUser}>
                <h2>로그인</h2>
                <div className="login_form">
                    <p><input
                        className="login id"
                        type="text" name="username"
                        placeholder="아이디를 입력해주세요."
                        value={loginData.username}
                        onChange={change}
                    /></p>
                    <p><input
                        className="login pw"
                        type="password" name="password"
                        placeholder="비밀번호를 입력해주세요."
                        value={loginData.password}
                        onChange={change}
                    /></p>
                </div>
                <div className="login_bt_wrap">
                    <input className="bt login_bt" type="submit" value="로그인" />
                    <input className="bt sign_up" type="button" value="회원가입" />
                </div>
                <div className="find_my_account">
                    <a href="/find_my/id">아이디 찾기</a>
                    <div className="separator"></div>
                    <a href="/find_my/pw">비밀번호 찾기</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
