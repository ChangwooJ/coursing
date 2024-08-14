import React, { useEffect, useState } from "react";

const Header = ({isAuthenticated}) => {
    const [logged, setLogged] = useState("로그인");

    useEffect(() => {
        if (isAuthenticated) {
            setLogged("로그아웃");
        } else {
            setLogged("로그인");
        }
    }, [isAuthenticated]);

    return (
        <React.Fragment>
            <div>
                {logged}
            </div>
        </React.Fragment>
    )
}

export default Header;