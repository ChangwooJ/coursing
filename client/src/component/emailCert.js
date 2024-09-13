import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailCert = ({ loginData }) => {
    const [cert, setCert] = useState('');
    const navigate = useNavigate();

    const change = (e) => {
        setCert(e.target.value);
    }

    const checkCode = () => {
        axios.post('http://localhost:8000/api/check_code', { code: cert, email: loginData.email })
            .then(() => {
                alert('인증 성공');
                saveUserInfo();
            })
            .catch((err) => {
                console.log(err);
                alert('인증 실패');
            });
    }

    const saveUserInfo = () => {
        axios.post('http://localhost:8000/api/saveUser', { 
            username: loginData.username,
            password: loginData.password,
            name: loginData.name,
            ph: loginData.ph,
            email: loginData.email,
            address: loginData.address
         })
            .then(() => {
                alert('회원가입을 완료하였습니다!');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                alert('회원가입에 실패했습니다.');
            })
    }
//console.log(loginData);
    return (
        <div className="signup_wrap">
            <h2>이메일 인증</h2>
            <div className="signup_form">
                <p>{loginData.email}로 전송된 이메일 확인 코드를 입력해주세요</p>
                <p>
                    <input
                        className="cert"
                        type="text" name="cert"
                        placeholder="인증 코드를 입력해주세요."
                        value={cert}
                        onChange={change}
                    />
                </p>
            </div>
            <button onClick={checkCode}>인증코드 확인</button>
        </div>
    )
}

export default EmailCert;