import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';
import './style/main.css';
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { API_DOMAIN } from '../../api/domain';
import { useNavigate, useLocation } from 'react-router-dom';


/** 메인 페이지 로그인 시 토큰 받아오기 */
export default function MBTInyMain() {
    const [accessToken, setAccessToken] = useState('');
    const [userName, setUserName] = useState('');
    const [firstRecommd, setFirstRecommdData] = useState([]); // 우리 아이가 좋아한 도서와 유사한 도서
    const [secondRecommd, setSecondRecommdData] = useState([]); // 우리 아이와 비슷한 성향의 친구들이 추천한 도서
    const location = useLocation();
    const childId = location.state?.child_id || localStorage.getItem("childId");

    const scrollRef = useRef(null);
    useEffect(() => {
        const handleScroll = (event) => {
            if (scrollRef.current) {
                event.preventDefault();
                scrollRef.current.scrollBy({ left: event.deltaY * 1.5, behavior: "smooth" });
            }
        };

        const refCurrent = scrollRef.current;
        if (refCurrent) {
            refCurrent.addEventListener("wheel", handleScroll);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (refCurrent) {
                refCurrent.removeEventListener("wheel", handleScroll);
            }
        };
    }, []);

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
        // console.log(token);
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
            // // 첫번째 API - 자녀가 좋아요한 도서와 유사한 도서 추천
            // const firstRecommdDataResponse = await axios.get(`${API_DOMAIN}/contents/child/${childId}/recommendations`, {
            //     headers: { Authorization: `Bearer ${token}` }
            // });
            // setFirstRecommdData(firstRecommdDataResponse.data.result || []);


            // 두번째 API - 비슷한 성향의 친구들이 추천한 도서 목록
            const secondRecommdDataResponse = await axios.get(`${API_DOMAIN}/child/${childId}/embedding`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSecondRecommdData(secondRecommdDataResponse.data.result || []);




        } catch (error) {
            console.error("Error fetching child data:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="recommd-container">

            <div className="recommd-main-container">
                <div className="recommd-content-container">
                    <div className="recommended-books">
                        <h3>우리 아이가 좋아한 도서와 유사한 도서</h3>
                        <p>- 연령, 성별, 성향을 기반하여 맞춤형 도서를 추천합니다.</p>
                        <div className="book-container" ref={scrollRef}>
                            {firstRecommd.map((book, index) => (
                                <div className="book-item" key={index}>
                                    <img src={book.profileUrl || "../img/avatar.png"} alt={book.title} className="book-cover" />
                                    <p className="book-title" title={book.title}>{book.title || "제목 없음"}</p>
                                </div>
                            ))}
                        </div> 
                    </div>
                </div>
            </div>

            <div className="recommd-main-container">
                <div className="recommd-content-container">
                    <div className="recommended-books">
                        <h3>우리 아이와 비슷한 성향의 친구들이 추천한 도서</h3>
                        <p>- 자녀의 연령, 성별, MBTI 정보를 바탕으로 맞춤형 도서를 추천합니다.</p>
                        <div className="book-container" ref={scrollRef}>
                            {secondRecommd.map((book, index) => (
                                <div className="book-item" key={index}>
                                    <img src={book.profileUrl || "../img/avatar.png"} alt={book.title} className="book-cover" />
                                    <p className="book-title" title={book.title}>{book.title || "제목 없음"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <NavBar />
        </div>
    );
}
