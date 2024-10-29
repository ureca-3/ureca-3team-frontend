import './Header.css';
import { TiThMenu, TiBell  } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FcSearch } from "react-icons/fc";
import { API_DOMAIN } from '../api/domain';
import axios from 'axios';

const Header = ({ showLoginInfoOnly }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [userMenu, setUserMenu] = useState(false);
    const [userName, setUserName] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [userId, setUserId] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        // console.log(token);
        if (token) {
            setAccessToken(token);
            getData(token);
            
        }
    }, [accessToken]);

    const goToMyPage = async () => {
        window.location.href = `http://localhost:3000/mypage/${userId}`;
    }

    const GoHistory = () => {
        const childId = localStorage.getItem("childId"); // 로컬스토리지에서 childId 가져오기
        navigate('/mbtiHistory', { state: { childId: childId } }); // childId를 state로 전달
    };

    const logout = async () => {
        console.log("로그아웃");
        try {
            await axios.post(`${API_DOMAIN}/auth/logout`,
                {},
                {
                    headers:
                    {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
            localStorage.removeItem("jwtToken");
            setAccessToken("");
            window.location.href = "http://localhost:3000/sign";
        } catch (error) {
            console.error("로그아웃 오류")
        }
    }


    const getData = async (accessToken) => {
        const kakaoUser = await axios.get(`${API_DOMAIN}/auth/user`, {
            headers:
            {
                Authorization: `Bearer ${accessToken}`

            }
        });

        // console.log(kakaoUser.data.result.id);
        setUserRole(kakaoUser.data.result.role);
        setUserId(kakaoUser.data.result.id);
        setUserName(kakaoUser.data.result.oauthInfo.nickname);
        setUserProfile(kakaoUser.data.result.oauthInfo.profileUrl);
        return kakaoUser.data.result.oauthInfo;
    }

    const handleNotice = () => {
        console.log("공지사항");
    }


    const toggleUserMenu = () => {
        setUserMenu(!userMenu);
    }
    
    // 메뉴 버튼 클릭 시 토글 함수
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // 검색 입력 핸들러
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // 검색 동작 처리
        console.log("Search query:", searchQuery);
    };

    return (
        <header className={`header-container ${showLoginInfoOnly ? 'row-reverse' : ''}`}>            {/* showLoginInfoOnly가 true일 때는 로그인 정보만 표시 */}
            {showLoginInfoOnly ? (
                <div className="user-info">
                <img src={userProfile} alt="Profile" className="profile-image" onClick={toggleUserMenu} />
                {userMenu && (
                    <div className="dropdown-user-menu">
                        <ul>
                            <li onClick={goToMyPage}>마이페이지</li>
                            <li onClick={logout}>로그아웃</li>
                        </ul>
                    </div>
                )}
                <span className="user-name">{userName}님</span>
                <TiBell className="bell-icon" onClick={handleNotice} />
            </div>
            ) : (
                <>
            {/* 왼쪽 메뉴 버튼 */}
            <div className="menu-button">
                <TiThMenu onClick={toggleMenu} className="menu-icon" />
                {/* 메뉴 토글 */}
                {/* 사용자 */}
                {menuOpen && userRole === 'USER' && (
                    <div className="dropdown-menu">
                        <ul>
                            <li onClick={() => navigate('/')}>Home</li>
                            <li onClick={() => navigate('/mbtiStart')}>MBTI</li>
                            <li onClick={GoHistory}>HISTORY</li>
                        </ul>
                    </div>
                )}


                {/* 관리자 */}
                {menuOpen && userRole === 'ADMIN' && (
                    <div className="dropdown-menu">
                        <ul>
                            <li>Home</li>
                            <li>CONTENTS 관리</li>
                            <li>USER 관리</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* 가운데 검색창 */}
            <div className="search-bar">
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                        type="text"
                        placeholder="콘텐츠를 입력하세요."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button type="submit" className="search-button">
                        <FcSearch />
                    </button>
                </form>
            </div>

            {/* 오른쪽 프로필, 닉네임, 공지 아이콘 */}
            <div className="user-info">
                <img src={userProfile} alt="Profile" className="profile-image" onClick={toggleUserMenu} />
                {userMenu && (
                    <div className="dropdown-user-menu">
                        <ul>
                            <li onClick={goToMyPage}>마이페이지</li>
                            <li onClick={logout}>로그아웃</li>
                        </ul>
                    </div>
                )}
                <span className="user-name">{userName}님</span>
                <TiBell className="bell-icon" onClick={handleNotice} />
            </div>
            </>
            )}
        </header>
    );
};
export default Header;
