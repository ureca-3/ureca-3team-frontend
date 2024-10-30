import React, { useState, useEffect } from 'react';
import './MyPageStyles.css';
import Header from '../../components/Header';
import { API_DOMAIN } from '../../api/domain';
import axios from 'axios';
import { BsPencilSquare } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const [userName, setUserName] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [childData, setChildData] = useState([]);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        setAccessToken(token); console.log(token);
        getData(token);
        getChildData(token);
    }, []);

    const changeChildProfile = (childId) => {
        localStorage.setItem("childId", childId);
        navigate('/home', { state: { childId: childId } }); // 메인 페이지로 이동하면서 childId 값 전달
    };

    const getData = async (accessToken) => {
        const kakaoUser = await axios.get(`${API_DOMAIN}/auth/user`, {
            headers:
            {
                Authorization: `Bearer ${accessToken}`

            }
        })
        setUserName(kakaoUser.data.result.oauthInfo.nickname);
        setUserProfile(kakaoUser.data.result.oauthInfo.profileUrl);
        setUserRole(kakaoUser.data.result.role);
        return kakaoUser.data.result.oauthInfo;
    }

    const getChildData = async (accessToken) => {
        const response = await axios.get(`${API_DOMAIN}/child`, {
            headers:
            {
                Authorization: `Bearer ${accessToken}`
            }
        })
        setChildData(response.data.result);
    };

    return (
        <div>
            <Header />
            <div className="main-container">

                {/* 프로필 영역 */}
                <div style={{ flexDirection: 'column' }}>
                    <div className="profile-container">
                        <div className="profile-icon">
                            <img src={userProfile} alt="프로필 이미지" />
                        </div>
                        <div className="username">{userName}</div>
                    </div>

                    {/* 자녀 리스트 */}
                    <div className="children-container">
                        <h2>자녀 선택</h2>

                        <ul className="children-list">
                            {childData ?
                                childData.map((child, index) => (
                                    <li key={index} className="child-item"
                                        onClick={() => changeChildProfile(child.childId)}>
                                        <img src={child.profileUrl || "../img/avatar.png"} alt={child.name} className="child-image" style={{ marginTop: '15px' }} />
                                        <span className="child-name" style={{ marginLeft: '20px' }}>{child.name} </span>
                                        <button
                                            style={{ textAlign: 'right' }}
                                            className="edit-child-btn"
                                            onClick={(e) => {
                                                localStorage.setItem("childId", child.childId);
                                                e.stopPropagation(); // 부모 요소로의 클릭 이벤트 전파 막기
                                                navigate("/childpage");
                                            }}>
                                            <BsPencilSquare />
                                        </button>
                                    </li>
                                )) : (<ul> 자녀가 없습니다. </ul>)}
                        </ul>

                        {userRole === 'USER' ?
                            (<button className="add-child-btn" onClick={() => navigate("/register")} >자녀 추가</button>)
                            :
                            <></>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
