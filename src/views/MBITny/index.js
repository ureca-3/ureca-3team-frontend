import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';
import { useState, useEffect } from "react";


/** 메인 페이지 로그인 시 토큰 받아오기 */
export default function MBTInyMain() {
    const [accessToken, setAccessToken] = useState('');
    const [userName, setUserName] = useState('');


    return (
        <div>
            <Header />
        <div className="main-container">
            <h1>Welcome, {userName ? userName : "Guest"}!</h1>
        </div>
        </div>
    );
}
