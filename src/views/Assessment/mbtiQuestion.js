import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';
import './style/question.css';
import questions from './data/questions';
import axios from 'axios';

export default function MbtiQuestion() {
    const navigate = useNavigate();
    // 상태 관리: 현재 질문 인덱스와 각 성향의 점수 저장
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    // 성향별 점수 저장 (EI/SN/TF/JP)
    const [scores, setScores] = useState({
        EI: [],
        SN: [],
        TF: [],
        JP: [],
    });

    // 선택지 변경 핸들러
    const handleOptionChange = (option) => {
        setSelectedOption(option);
        const scoreValues = [0, 25, 50, 75, 100]; // 각 보기의 점수 배열
        const selectedScore = scoreValues[option]; // 선택된 옵션에 따른 점수
        const currentType = questions[currentQuestion].type; // 현재 질문의 성향 타입

        // 현재 성향에 점수를 추가
        setScores((prevScores) => {
            const updatedScores = {
                ...prevScores,
                [currentType]: [...prevScores[currentType], selectedScore]
            };

            // 다음 질문으로 이동
            if (currentQuestion < questions.length - 1) {
                setTimeout(() => {
                    setCurrentQuestion(currentQuestion + 1);
                    setSelectedOption(null); // 선택지 초기화
                }, 300);
            } else {
                setLoading(true);

                // 모든 질문이 끝나면 평균값을 계산하고 콘솔에 출력
                const averages = calculateAverages(updatedScores); // 업데이트된 점수로 평균값 계산
                // MBTIResult 페이지로 이동
                console.log("요소별 평균값:", averages); // 요소별 평균값을 콘솔에 출력
                
                // 3초 후에 결과 전송 및 페이지 이동
                setTimeout(() => {
                    sendResultsToBackend(averages);
                }, 3000);            }
                
            return updatedScores;
        });
        
    };

    // 평균값 계산
    const calculateAverages = (updatedScores) => {
        const averages = {
            m: Math.round(updatedScores.EI.reduce((a, b) => a + b, 0) / updatedScores.EI.length) || 0,
            b: Math.round(updatedScores.SN.reduce((a, b) => a + b, 0) / updatedScores.SN.length) || 0,
            t: Math.round(updatedScores.TF.reduce((a, b) => a + b, 0) / updatedScores.TF.length) || 0,
            i: Math.round(updatedScores.JP.reduce((a, b) => a + b, 0) / updatedScores.JP.length) || 0
        };
        return averages;
    };

    // 결과를 백엔드로 전송하는 함수 (예: POST 요청)
    const sendResultsToBackend = (averages) => {
        // const token = localStorage.getItem('token');
        const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTczMDM2ODM1NiwiaWF0IjoxNzI5ODQ5OTU2LCJpZCI6MSwicm9sZXMiOiJST0xFX1VTRVIifQ.8JwTgYHo8xTeNrqmPHchkzpZcbNxTj14MoCpXpkeB6kkZZcBlZRwCXTwVXEiQW_S3w_Kvsz4SUOBumI5n25l0g';
    
         // 토큰이 null인지 확인하여 오류 방지
        if (!token) {
            console.error('No token found');
            return;
        }

        // axios를 사용한 POST 요청
        axios.post('http://localhost:8080/api/v1/assessment/1', averages, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            console.log('Success:', response.data);
            const mbtiResult = response.data.result.mbti;
            navigate(`/mbtiResult?mbti=${mbtiResult}`,{
                state: {
                    averages: averages
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <Header showLoginInfoOnly={true} />
                <div className="mbti-question-container">
   
                {loading ? ( // 로딩 중일 때 로딩바 표시
                    <div className="loading-bar">
                        <p>결과를 분석하는 중입니다...</p>
                        <div className="bar">
                            <div className="progress"></div>
                        </div>
                    </div>
                ) : (
           
                    <div>
                        <h1>자녀 성격 유형 검사</h1>
                        <div className="question-box">
                            <h2>Q{currentQuestion + 1}.</h2>
                            <p>{questions[currentQuestion].question}</p>
                            <div className="options">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`option ${selectedOption === index ? 'selected' : ''}`}
                                        onClick={() => handleOptionChange(index)}
                                    >
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                </div>
            <NavBar />
        </div>
    );
}