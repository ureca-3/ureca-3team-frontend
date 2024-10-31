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
    const [firstRecommd, setFirstRecommdData] = useState([]); // 최근 좋아요 한 도서 목록
    const [secondRecommd, setSecondRecommdData] = useState([]); // 우리 아이가 좋아한 도서와 유사한 도서
    const [thirdRecommd, setThirdRecommdData] = useState([]); // 우리 아이와 비슷한 성향의 친구들이 추천한 도서
    const location = useLocation();
    const childId = location.state?.child_id || localStorage.getItem("childId");
    const navigate = useNavigate();

    const firstScrollRef = useRef(null);
    const secondScrollRef = useRef(null);
    const thirdScrollRef = useRef(null);

    const goChildDetail = () => {
        navigate('/childpage');
    }

    // goContentDetail 함수 정의
    const goContentDetail = (contentId) => {
        navigate(`/${contentId}`);
    };

    useEffect(() => {
        // 첫번째 목록 스크롤 이벤트
        const handleFirstScroll = (event) => {
            if (firstScrollRef.current) {
                event.preventDefault();
                firstScrollRef.current.scrollBy({ left: event.deltaY * 1.5, behavior: "smooth" });
            }
        };

        // 두번째 목록 스크롤 이벤트
        const handleSecondScroll = (event) => {
            if (secondScrollRef.current) {
                event.preventDefault();
                secondScrollRef.current.scrollBy({ left: event.deltaY * 1.5, behavior: "smooth" });
            }
        };

        // 세번째 목록 스크롤 이벤트
        const handleThirdScroll = (event) => {
            if (thirdScrollRef.current) {
                event.preventDefault();
                thirdScrollRef.current.scrollBy({ left: event.deltaY * 1.5, behavior: "smooth" });
            }
        };

        // 첫 번째 목록에 이벤트 리스너 추가
        const firstRefCurrent = firstScrollRef.current;
        if (firstRefCurrent) {
            firstRefCurrent.addEventListener("wheel", handleFirstScroll);
        }

        // 두 번째 목록에 이벤트 리스너 추가
        const secondRefCurrent = secondScrollRef.current;
        if (secondRefCurrent) {
            secondRefCurrent.addEventListener("wheel", handleSecondScroll);
        }

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            if (firstRefCurrent) {
                firstRefCurrent.removeEventListener("wheel", handleFirstScroll);
            }
            if (secondRefCurrent) {
                secondRefCurrent.removeEventListener("wheel", handleSecondScroll);
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
            <div className="recommd-container">
                 <div className="recommd-main-container">
                    <div className="recommd-content-container">
                        <div className="recommended-books">
                            <h3>최근 좋아요 누른 도서</h3>
                            <p>- 최근 좋아요 누른 도서 콘텐츠 목록입니다.</p>
                            <div className="book-container" ref={firstScrollRef}>
                                {firstRecommd.map((book, index) => (
                                    <div className="book-item" key={index} onClick={() => goContentDetail(book.contentId)}>
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
                            <h3>우리 아이가 좋아한 도서와 유사한 도서</h3>
                            <p>- 연령, 성별, 성향을 기반하여 맞춤형 도서를 추천합니다.</p>
                            <div className="book-container" ref={secondScrollRef}>
                                {secondRecommd.map((book, index) => (
                                    <div className="book-item" key={index} onClick={() => goContentDetail(book.bookId)}>
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
                            <div className="book-container" ref={thirdScrollRef}>
                                {thirdRecommd.map((book, index) => (
                                    <div className="book-item" key={index} onClick={() => goContentDetail(book.bookId)}>
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
