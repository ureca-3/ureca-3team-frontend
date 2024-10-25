import './Header.css';
import { TiThMenu, TiBell  } from "react-icons/ti";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Header = ({ profileImage, userName, showLoginInfoOnly }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

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
        <header className="header-container">
            {/* showLoginInfoOnly가 true일 때는 로그인 정보만 표시 */}
            {showLoginInfoOnly ? (
                <div className="user-info">
                    <img src={profileImage || "/img/avatar.png"} alt="Profile" className="profile-image" />
                    <span className="user-name">{userName || "홍길동님"}</span>
                    <TiBell className="bell-icon" />
                </div>
            ) : (
                <>
                    {/* 왼쪽 메뉴 버튼 */}
                    <div className="menu-button">
                        <TiThMenu onClick={toggleMenu} className="menu-icon" />
                        {/* 메뉴 토글 */}
                        {menuOpen && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li>Home</li>
                                    <li onClick={() => navigate('/mbtiStart')}>MBTI</li>
                                    <li onClick={() => navigate('/history')}>HISTORY</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* 가운데 검색창 */}
                    <div className="search-bar">
                        <form onSubmit={handleSearchSubmit}>
                            <input 
                                type="text" 
                                placeholder="콘텐츠 입력" 
                                value={searchQuery}
                                onChange={handleSearch} 
                            />
                        </form>
                    </div>

                    {/* 오른쪽 프로필, 닉네임, 공지 아이콘 */}
                    <div className="user-info">
                        <img src={profileImage || "/img/avatar.png"} alt="Profile" className="profile-image" />
                        <span className="user-name">{userName || "홍길동님"}</span>
                        <TiBell className="bell-icon" />
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;