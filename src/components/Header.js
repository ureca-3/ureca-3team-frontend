import './Header.css';
import { TiThMenu, TiBell } from "react-icons/ti";
import { useState } from 'react';
import { FcSearch } from "react-icons/fc";

const Header = ({ profileImage, userName }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [userMenu, setUserMenu] = useState(false);

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
        <header className="header-container">
            {/* 왼쪽 메뉴 버튼 */}
            <div className="menu-button">
                <TiThMenu onClick={toggleMenu} className="menu-icon" />
                {/* 메뉴 토글 */}
                {/* 사용자 */}
                {/* {menuOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li>Home</li>
                            <li>MBTI</li>
                            <li>HISTORY</li>
                        </ul>
                    </div>
                )} */}
                {/* 관리자 */}
                {menuOpen && (
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
                        placeholder="콘텐츠 입력"
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
                <img src="/img/avatar.png" alt="Profile" className="profile-image" onClick={toggleUserMenu} />
                {userMenu && (
                    <div className="dropdown-user-menu">
                        <ul>
                            <li>마이페이지</li>
                            <li>로그아웃</li>
                        </ul>
                    </div>
                )}
                <span className="user-name">홍길동님</span>
                <TiBell className="bell-icon" onClick={handleNotice} />
            </div>
        </header>
    );
};

export default Header;