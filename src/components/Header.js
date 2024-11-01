import './Header.css';
import { TiThMenu, TiBell } from "react-icons/ti";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FcSearch } from "react-icons/fc";
import { API_DOMAIN, CLIENT_DOMAIN } from '../api/domain';
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
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false); // 새 알림 여부 표시

    useEffect(() => {
        // localStorage에서 기존 알림을 불러와서 초기화
        const savedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
        setNotifications(savedNotifications);

        // 저장된 알림이 있으면 빨간 점 표시
        if (savedNotifications.length > 0) {
            setHasUnreadNotifications(true);
        }
    }, []);

    const [childData, setChildData] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const childId = localStorage.getItem("childId");
        // console.log(childId);

        if (childId) {
            axios.get(`${API_DOMAIN}/child/${childId}`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then((response) => {
                setChildData(response.data.result);
                // console.log(childData);
            })
        }

        if (token) {
            setAccessToken(token);
            getData(token);
        }

   
    
    // fetchNotifications(token);



    // SSE 연결 설정
    if (token) {
        const eventSource = new EventSource(`${API_DOMAIN}/notifications/newbook?token=${token}`);

        eventSource.onmessage = (event) => {
            const newNotification = JSON.parse(event.data);
            setNotifications((prev) => {
                const updatedNotifications = [newNotification, ...prev];
                localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
                return updatedNotifications;
            });
            setHasUnreadNotifications(true);
        };

        eventSource.onerror = () => {
            console.error("SSE 연결이 끊어졌습니다.");
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    } else {
        console.error("토큰이 유효하지 않습니다. SSE 연결이 설정되지 않았습니다.");
    }
}, [accessToken]);

// 알림 클릭 시 삭제
const handleNotificationClick = (notification, index) => {
    if (notification.contentId) {
        window.location.href = `${CLIENT_DOMAIN}/contentsDetail/${notification.contentId}`;
    }
    setNotifications((prev) => {
        // window.location.href = `http://localhost:3000/`
        const updatedNotifications = prev.filter((_, i) => i !== index);
        localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
        return updatedNotifications;
    });
};

const goToMyPage = async () => {
    window.location.href = `${CLIENT_DOMAIN}/mypage`;
}

const goChildDetail = () => {
    const childId = localStorage.getItem("childId");
    navigate('/childpage', { state: { childId: childId } });
}

const GoHistory = () => {
    const childId = localStorage.getItem("childId"); // 로컬스토리지에서 childId 가져오기
    navigate('/mbtiHistory', { state: { childId: childId } }); // childId를 state로 전달
};

const MbtiData = () => {
    const childId = localStorage.getItem("childId"); // 로컬스토리지에서 childId 가져오기
    navigate('/mbtiData', { state: { childId: childId } }); // childId를 state로 전달
};

const GoMbtiStart = () => {
    const childId = localStorage.getItem("childId"); // 로컬스토리지에서 childId 가져오기
    navigate('/mbtiStart', { state: { childId: childId } }); // childId를 state로 전달
}

const logout = async () => {
    console.log("로그아웃");
    try {
        await axios.post(`${API_DOMAIN}/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        localStorage.clear(); 
        setAccessToken("");
        window.location.href = `${CLIENT_DOMAIN}/sign`;
    } catch (error) {
        console.error("로그아웃 오류")
    }
}

const getData = async (accessToken) => {
    const kakaoUser = await axios.get(`${API_DOMAIN}/auth/user`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    setUserRole(kakaoUser.data.result.role);
    setUserId(kakaoUser.data.result.id);
    setUserName(kakaoUser.data.result.oauthInfo.nickname);
    setUserProfile(kakaoUser.data.result.oauthInfo.profileUrl);
    return kakaoUser.data.result.oauthInfo;
}

const fetchNotifications = async (token) => {
    try {
        const response = await axios.get(`${API_DOMAIN}/notifications/newbook`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(response.data.notifications || []);
    } catch (error) {
        console.error("알림을 가져오는 중 오류:", error);
    }
};

const handleNotice = () => {
    setShowNotifications(!showNotifications);
    // 알림 창을 열고 닫을 때도 읽지 않은 알림이 남아 있으면 빨간 점을 유지
    if (showNotifications && notifications.length === 0) {
        setHasUnreadNotifications(false);
    }
};

const toggleUserMenu = () => {
    setUserMenu(!userMenu);
}

const toggleMenu = () => {
    setMenuOpen(!menuOpen);
};

const handleSearch = (e) => {
    setSearchQuery(e.target.value);
};

const handleSearchSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("keyword", searchQuery);
    navigate(`/search`, { state: { keyword: searchQuery } });
};



return (
    <header className={`header-container ${showLoginInfoOnly ? 'row-reverse' : ''}`}>
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
                <div className="notification-icon">
                    <TiBell className="bell-icon" onClick={handleNotice} />
                    {hasUnreadNotifications && <span className="notification-dot"></span>} {/* 빨간 점 표시 */}
                </div>
            </div>
        ) : (
            <>
                <div className="menu-button">
                    <TiThMenu onClick={toggleMenu} className="menu-icon" />
                    {menuOpen && userRole === 'USER' && (
                        <div className="dropdown-menu">
                            <ul>
                                {childData ? (
                                    <>
                                        <li onClick={goChildDetail} style={{ border: '1px solid gray', borderRadius: '10px'  }}>우리 아이 : <img src={childData.profileUrl} style={{ width: '60px', marginRight: '15px', borderRadius: '50%' }}></img>{childData.name} </li>
                                        <li onClick={() => navigate('/main')}>Home</li>
                                        <li onClick={GoMbtiStart}>MBTI</li>
                                        <li onClick={GoHistory}>HISTORY</li>
                                        <li onClick={MbtiData}>Data</li>
                                    </>)
                                    :
                                    <li onClick={goToMyPage}>자녀 선택</li>
                                }

                            </ul>
                        </div>
                    )}
                    {menuOpen && userRole === 'ADMIN' && (
                        <div className="dropdown-menu">
                            <ul>
                                <li onClick={() => navigate("/admin")}>Home</li>
                                <li onClick={() => navigate("/adminUpload")}>CONTENTS 업로드</li>
                                {/*<li>USER 관리</li> */}
                            </ul>
                        </div>
                    )}
                </div>


                <div className="user-info">
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
                    <div className="notification-icon">
                        <TiBell className="bell-icon" onClick={handleNotice} />
                        {hasUnreadNotifications && <span className="notification-dot"></span>} {/* 빨간 점 표시 */}
                    </div>
                </div>
            </>
        )}

        {showNotifications && (
            <div className="notification-slide">
                <h2>알림</h2>
                <button className="close-button" onClick={handleNotice}>🆇</button>
                <div className="notification-content">
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <div key={index} className="notification-item" onClick={() => handleNotificationClick(notification, index)}>
                                <span>⭐ {notification.title}</span>
                                <p>{notification.message}</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-notifications">읽지 않은 알림이 없습니다.</div>
                    )}
                </div>
            </div>
        )}
    </header>
);
};

export default Header;
