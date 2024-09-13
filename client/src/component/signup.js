import React from "react";

const SignUpComp = ({ setCert, loginData, setLoginData }) => {
    const change = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    return(
        <div className="signup_wrap">
            <form>
                <h2>회원가입</h2>
                <div className="signup_form">
                    <p><input
                        className="signup id"
                        type="text" name="username"
                        placeholder="아이디"
                        value={loginData.username}
                        onChange={change}
                    /></p>
                    <p><input
                        className="signup pw"
                        type="password" name="password"
                        placeholder="비밀번호"
                        value={loginData.password}
                        onChange={change}
                    /></p>
                    <p><input
                        className="signup name"
                        type="text" name="name"
                        placeholder="이름"
                        value={loginData.name}
                        onChange={change}
                    /></p>
                    <p><input
                        className="signup ph"
                        type="text" name="ph"
                        placeholder="전화번호"
                        value={loginData.ph}
                        onChange={change}
                    /></p>
                    <p><input
                        className="signup email"
                        type="text" name="email"
                        placeholder="email"
                        value={loginData.email}
                        onChange={change}
                    /></p>
                    <p><input
                        className="signup address"
                        type="text" name="address"
                        placeholder="주소"
                        value={loginData.address}
                        onChange={change}
                    /></p>
                </div>
                <div className="signup_bt_wrap">
                    <button className="bt login_bt" onClick={() => setCert(true)} >가입</button>
                </div>
                
            </form>
        </div>
    );
}

export default SignUpComp;