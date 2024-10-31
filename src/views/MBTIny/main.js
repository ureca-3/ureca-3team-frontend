import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';
import './style/main.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_DOMAIN } from "../../api/domain";
import { useNavigate, useLocation } from 'react-router-dom';
import ContentsTab from './contentsTab';
import RecommendsTab from './recommendsTab';

export default function MainContents() {
    const [accessToken, setAccessToken] = useState('');
    const [userName, setUserName] = useState('');
    const [firstRecommd, setFirstRecommdData] = useState([]); // 최근 좋아요 한 도서 목록
    const [secondRecommd, setSecondRecommdData] = useState([]); // 우리 아이가 좋아한 도서와 유사한 도서
    const [thirdRecommd, setThirdRecommdData] = useState([]); // 우리 아이와 비슷한 성향의 친구들이 추천한 도서
    const [activeTab, setActiveTab] = useState("contents");
    const location = useLocation();
    const childId = location.state?.child_id || localStorage.getItem("childId");
    const navigate = useNavigate();

    // const goContentDetail = (contentId) => {
    //     console.log(`Navigating to content ID: ${contentId}`); // 로그 추가
    //     navigate(`/${contentId}`);
    // };

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            setAccessToken(token);
            getData(token);
        }
        if (childId) {
            localStorage.setItem("childId", childId);
            fetchAllRecommendApi(childId);
        }
    }, [accessToken, childId]);

    // 사용자 데이터 조회
    const getData = async (accessToken) => {
        try {
            const kakaoUser = await axios.get(`${API_DOMAIN}/auth/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setUserName(kakaoUser.data.result.oauthInfo.nickname);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // 여러 API 호출 함수
    const fetchAllRecommendApi = async (childId) => {
        const token = accessToken || localStorage.getItem("jwtToken");

        try {
            const firstRecommdDataResponse = await axios.get(`${API_DOMAIN}/viewing/${childId}/recent-liked`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFirstRecommdData(firstRecommdDataResponse.data.result || []);

            const secondRecommdDataResponse = await axios.get(`${API_DOMAIN}/contents/child/${childId}/recommendations`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSecondRecommdData(secondRecommdDataResponse.data.result || []);

            const thirdRecommdDataResponse = await axios.get(`${API_DOMAIN}/child/${childId}/embedding`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setThirdRecommdData(thirdRecommdDataResponse.data.result || []);

        } catch (error) {
            console.error("Error fetching child data:", error);
        }
    };


    return (
        <div>
            <Header />
            <div className="tab-menu">
                <button onClick={() => setActiveTab("contents")} className={activeTab === "contents" ? "active-tab" : ""}>콘텐츠</button>
                <button onClick={() => setActiveTab("recommends")} className={activeTab === "recommends" ? "active-tab" : ""}>추천</button>
            </div>

            <div className="tab-content">
                {activeTab === "contents" && <ContentsTab />}
                {activeTab === "recommends" && (
                    <RecommendsTab
                        firstRecommd={firstRecommd}
                        secondRecommd={secondRecommd}
                        thirdRecommd={thirdRecommd}
                        // goContentDetail={goContentDetail}
                    />
                )}
            </div>
            <NavBar />
        </div>
    );
}