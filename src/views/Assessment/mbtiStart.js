import React from 'react';
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { useNavigate, useLocation } from 'react-router-dom';
import '../Page.css';
import './style/start.css';

export default function Assessment() {
    const location = useLocation();
    const { child_id } = location.state;
    const navigate = useNavigate(); 

    const goQuestion = () => {
        navigate('/mbtiQuestion',{
            state: {
                child_id: child_id
            }
        }); 
    };

    return (
        <div>
            <Header showLoginInfoOnly={true}/>
                <div className="start-main-container">
                    <div className="start-content-container">
                        <h1>MBTI로 보는</h1>
                        <h2>우리 아이 성향 검사</h2>
                        <p className="description">우리 아이에게 맞는 도서 콘텐츠 추천 제공</p>
                        <p className="details">총 12문항<br />5-10분 소요</p>
                        <button className="start-button" onClick={goQuestion}>시작해 볼까요?</button>            
                    </div>
                </div>
            <NavBar />
        </div>
    );
}
