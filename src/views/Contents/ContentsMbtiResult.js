import { API_DOMAIN } from "../../api/domain";
import axios from "axios";
import { useState, useEffect } from "react";
import '../Page.css';
import './styles.css';

export default function ContentsMbtiResult({ contentId }) {
    const [accessToken, setAccessToken] = useState('');
    const [mbtiType, setMbtiType] = useState('');

    /** 데이터 선언 {eiScore, snScore, tfScore, jpScore}*/
    const [eiScore, setEiScore] = useState('');
    const [snScore, setSnScore] = useState('');
    const [tfScore, setTfScore] = useState('');
    const [jpScore, setJpScore] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            setAccessToken(token);
            getContentsData(token);
            // console.log(accessToken)
        }
    }, [accessToken]);


    const getContentsData = async (accessToken) => {
        const response = await axios.get(`${API_DOMAIN}/contents/read/${contentId}`,
            {
                headers:
                {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        setMbtiType(response.data.result.contentsMbtiResult);
        setEiScore(response.data.result.contentsMbti.eiScore);
        setJpScore(response.data.result.contentsMbti.jpScore);
        setSnScore(response.data.result.contentsMbti.snScore);
        setTfScore(response.data.result.contentsMbti.tfScore);
    }

    return (
        <div className="mbti-chart">
            {/* I vs E */}
            <div className="chart-item">
                <span className="label">I ({100 - eiScore}%)</span>
                <div className="chart-bar-container">
                    <div className="chart-bar">
                        {mbtiType.includes('I') ? (
                            <div className="fill-left" style={{ width: `${100 - eiScore}%` }}></div>
                        ) : (
                            <div className="fill-right" style={{ width: `${eiScore}%` }}></div>
                        )}
                    </div>
                </div>
                <span className="label">E ({eiScore}%)</span>
            </div>

            {/* N vs S */}
            <div className="chart-item">
                <span className="label">N ({100 - snScore}%)</span>
                <div className="chart-bar-container">
                    <div className="chart-bar">

                        {mbtiType.includes('N') ? (
                            <div className="fill-left" style={{ width: `${100 - snScore}%` }}></div>
                        ) : (
                            <div className="fill-right" style={{ width: `${snScore}%` }}></div>
                        )}
                    </div>
                </div>
                <span className="label">S ({snScore}%)</span>
            </div>

            {/* F vs T */}
            <div className="chart-item">
                <span className="label">F ({100 - tfScore}%)</span>
                <div className="chart-bar-container">
                    <div className="chart-bar">

                        {mbtiType.includes('F') ? (
                            <div className="fill-left" style={{ width: `${100 - tfScore}%` }}></div>
                        ) : (
                            <div className="fill-right" style={{ width: `${tfScore}%` }}></div>
                        )}
                    </div>
                </div>
                <span className="label">T ({tfScore}%)</span>
            </div>

            {/* P vs J */}
            <div className="chart-item">
                <span className="label">P ({100 - jpScore}%)</span>
                <div className="chart-bar-container">
                    <div className="chart-bar">

                        {mbtiType.includes('P') ? (
                            <div className="fill-left" style={{ width: `${100 - jpScore}%` }}></div>
                        ) : (
                            <div className="fill-right" style={{ width: `${jpScore}%` }}></div>
                        )}
                    </div>
                </div>
                <span className="label">J ({jpScore}%)</span>
            </div>
        </div>
    );
}