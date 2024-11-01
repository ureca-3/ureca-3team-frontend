import React, { useEffect } from 'react';
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { useNavigate, useLocation } from 'react-router-dom';
import mbtiData from './data/mbtiData';
import '../Page.css';
import './style/result.css';

export default function MbtiResult() {
    const location = useLocation();
    const navigate = useNavigate(); 

    const queryParams = new URLSearchParams(location.search);
    const mbtiType = queryParams.get('mbti');
    const { averages } = location.state || { averages: { m: 0, b: 0, t: 0, i: 0 } }; // 기본값 추가

    // MBTI 정보 가져오기
    const mbtiInfo = mbtiType ? mbtiData[mbtiType] : null;
    // useEffect를 항상 호출되도록 변경
    useEffect(() => {
        if (averages) {
            console.log("Averages:", averages);
        } else {
            console.error("No averages data found.");
        }
    }, [averages]);

    if (!mbtiInfo) {
        return <div>MBTI 정보를 찾을 수 없습니다.</div>;
    }


    // 태그 생성
    const formattedTags = mbtiInfo.tag.split(',').map(tag => `#${tag.trim()}`).join(' ');

    // MBTI 유형에서 E/I, S/N, T/F, J/P 성향 추출
    const eiType = mbtiType.includes('E') ? 'E' : 'I';
    const snType = mbtiType.includes('S') ? 'S' : 'N';
    const tfType = mbtiType.includes('T') ? 'T' : 'F';
    const jpType = mbtiType.includes('J') ? 'J' : 'P';


    const goHome = () => {   
        navigate('/main');  
    };


    return (
        <div>
            <Header showLoginInfoOnly={true} />
            <div className="main-container">
                <div className="result-container">
                    {mbtiInfo.imageUrl && (
                        <img src={mbtiInfo.imageUrl} alt={mbtiInfo.title} className="mbti-image" />
                    )}

                    <div className="mbti-info">
                        <h1>{mbtiInfo.title}</h1>
                        <h2>{mbtiInfo.summary}</h2>
                        <h3>{formattedTags}</h3>
                        <p>{mbtiInfo.description}</p>

                        <div className="mbti-chart">
                            <div className="mbti-chart">
                                {/* I vs E */}
                                <div className="chart-item">
                                    <span className="label">I ({100 - averages.m}%)</span>
                                    <div className="chart-bar-container">
                                        <div className="chart-bar">
                                            {eiType === 'I' ? (
                                                <div className="fill-left" style={{ width: `${100 - averages.m}%` }}></div>
                                            ) : (
                                                <div className="fill-right" style={{ width: `${averages.m}%` }}></div>
                                            )}
                                        </div>
                                    </div>
                                    <span className="label">E ({averages.m}%)</span>
                                </div>

                                {/* N vs S */}
                                <div className="chart-item">
                                    <span className="label">N ({100 - averages.b}%)</span>
                                    <div className="chart-bar-container">
                                        <div className="chart-bar">

                                            {snType === 'N' ? (
                                                <div className="fill-left" style={{ width: `${100 - averages.b}%` }}></div>
                                            ) : (
                                                <div className="fill-right" style={{ width: `${averages.b}%` }}></div>
                                            )}
                                        </div>
                                    </div>
                                    <span className="label">S ({averages.b}%)</span>
                                </div>

                                {/* F vs T */}
                                <div className="chart-item">
                                    <span className="label">F ({100 - averages.t}%)</span>
                                    <div className="chart-bar-container">
                                        <div className="chart-bar">

                                            {tfType === 'F' ? (
                                                <div className="fill-left" style={{ width: `${100 - averages.t}%` }}></div>
                                            ) : (
                                                <div className="fill-right" style={{ width: `${averages.t}%` }}></div>
                                            )}
                                        </div>
                                    </div>
                                    <span className="label">T ({averages.t}%)</span>
                                </div>

                                {/* P vs J */}
                                <div className="chart-item">
                                    <span className="label">P ({100 - averages.i}%)</span>
                                    <div className="chart-bar-container">
                                        <div className="chart-bar">

                                            {jpType === 'P' ? (
                                                <div className="fill-left" style={{ width: `${100 - averages.i}%` }}></div>
                                            ) : (
                                                <div className="fill-right" style={{ width: `${averages.i}%` }}></div>
                                            )}
                                        </div>
                                    </div>
                                    <span className="label">J ({averages.i}%)</span>
                                </div>
                            </div>
                            <div>
                                <button className='goHome' onClick={goHome}>Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar />
        </div>
    );
}
