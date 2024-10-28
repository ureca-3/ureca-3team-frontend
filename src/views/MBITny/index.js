import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { API_DOMAIN } from '../../api/domain';
import { useLocation } from "react-router-dom";

/** 메인 페이지 로그인 시 토큰 받아오기 */
export default function MBTInyMain() {
    const [accessToken, setAccessToken] = useState('');
    const [userName, setUserName] = useState('');
    const location = useLocation();

    useEffect(() => {
        const qureyParams = new URLSearchParams(location.search);
        const token = qureyParams.get("token");

        if (token) {
            setAccessToken(token);
            localStorage.setItem("jwtToken", token);
            getData(token);
        }
    }, [location, accessToken]);

    const getData = async (accessToken) => {
        const kakaoUser = await axios.get(`${API_DOMAIN}/auth/user`, {
            headers:
            {
                Authorization: `Bearer ${accessToken}`

            }
        })
        setUserName(kakaoUser.data.result.oauthInfo.nickname);
        return kakaoUser.data.result.oauthInfo;
    }

    return (
        <div className="main-container">
            <h1>Welcome, {userName ? userName : "Guest"}!</h1>
        </div>
    );
}
