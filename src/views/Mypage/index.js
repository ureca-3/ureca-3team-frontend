import React from 'react';
import './styles.css';
import Header from '../../components/Header';

const MyPage = () => {
    return (
        <div>
            <Header />
            <div className="main-container">

                {/* 프로필 영역 */}
                <div className="profile-container">
                    <div className="profile-icon">
                        <img src="../img/avatar.png" alt="프로필 이미지" />
                    </div>
                    <div className="username">홍길동님</div>
                </div>

                {/* 자녀 리스트 */}
                <div className="children-container">
                    <h2>자녀</h2>
                    <ul className="children-list">
                        <li className="child-item">
                            <img src="../img/avatar.png" alt="Child 1" className="child-image" />
                            <span className="child-name">홍주혜</span>
                        </li>
                        <li className="child-item">
                            <img src="../img/avatar.png" alt="Child 2" className="child-image" />
                            <span className="child-name">홍재훈</span>
                        </li>
                        <li className="child-item">
                            <img src="../img/avatar.png" alt="Child 3" className="child-image" />
                            <span className="child-name">홍지원</span>
                        </li>
                    </ul>
                    <button className="add-child-btn">자녀 추가</button>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
