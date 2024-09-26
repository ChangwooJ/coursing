import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/SignUp.css";
import SignUpComp from "../component/Auth/signup";
import EmailCert from "../component/Auth/emailCert";

const SignUp = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
        name: '',
        ph: '',
        email: '',
        address: '',
    });

    const [cert, setCert] = useState(false);

    const email_certification = () => {
        axios.post('http://localhost:8000/api/signup_email', { email: loginData.email })
            .then(() => {
                alert('전송완료');
            })
            .catch((err) => {
                console.log(err);
                alert('전송실패');
            });
    }

    if(cert){
        email_certification();
        return <EmailCert loginData={loginData} />
    }
    else {
        return <SignUpComp setCert={setCert} loginData={loginData} setLoginData={setLoginData} />
    }
    
}

export default SignUp;
