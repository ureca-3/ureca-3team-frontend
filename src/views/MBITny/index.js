import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';
import { setRefreshToken } from "../../Auth/FetchUserData";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_DOMAIN } from '../../api/domain';

export default function MBTInyMain() {
    const [userName, setUserName] = useState("");
    const [accessToken, setAccessToken] = useState('');
    const getUserData = async () => {
        const response = await axios.get(`${API_DOMAIN}/auth/kakao`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        console.log(response.data);
    }

    // 카카오 로그인 성공 후 백엔드로 토큰을 보내서 JWT를 받아오는 함수
    const handleKakaoLogin = async (kakaoToken) => {
        try {
            const response = await axios.post(`${API_DOMAIN}/auth/kakao`, { token: kakaoToken });
            const { jwtToken, username } = response.data;

            // Refresh Token을 쿠키에 저장
            setRefreshToken(jwtToken);
            console.log(jwtToken);
            // 사용자 이름 상태에 저장
            setUserName(username);
        } catch (error) {
            console.error("카카오 로그인 실패", error);
        }
    };

    // 페이지가 처음 렌더링될 때 카카오 로그인 시도
    useEffect(() => {
        getUserData();
        // 예시로 카카오 로그인 과정이 성공했을 때 토큰을 받아옴 (프론트에서)
        // handleKakaoLogin(kakaoToken);
    }, []);

    return (
        <div className="main-container">
            <h1>Welcome, {userName ? userName : "Guest"}!</h1>
        </div>
    );
}
