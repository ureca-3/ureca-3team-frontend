import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import './style/history.css';
import { Line } from 'react-chartjs-2';
import { API_DOMAIN } from '../../api/domain';
import { useLocation } from 'react-router-dom';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function History() {
    const [type, setType] = useState('daily');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const location = useLocation();
    const { childId } = location.state || {}; // location.state가 null일 수 있으므로 기본값 설정
    const [childInfo, setChildInfo] = useState('null');

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        // console.log(token);
        if (token) {
            setAccessToken(token);
            getChildData(childId, token); // token을 함께 전달
        }
    }, [childId]);

    const getChildData = (childId, token) => {
        // API 호출 시 childId를 포함하여 데이터 요청
        axios.get(`${API_DOMAIN}/child/${childId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            console.log(response);
            const childInfo = response.data.result;
            setChildInfo(childInfo);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    };

    useEffect(() => {
        // childInfo가 로드된 후에만 fetchData 호출
        if (childInfo && accessToken) {
            fetchData(type);
        }
    }, [type, childInfo, accessToken]);


    // 데이터 요청 함수 (백엔드에서 데이터 받아오기)
    const fetchData = (type) => {
        setLoading(true);
        axios.get(`${API_DOMAIN}/history/${childId}?type=${type}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        })
            .then(response => {
                const data = response.data.result;
                setChartData({
                    labels: data.dayList,
                    datasets: [
                        {
                            label: 'E/I',
                            data: data.eiScore,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            tension: 0,
                            fill: true,
                        },
                        {
                            label: 'S/N',
                            data: data.snScore,
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            tension: 0,
                            fill: true,
                        },
                        {
                            label: 'T/F',
                            data: data.tfScore,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0,
                            fill: true,
                        },
                        {
                            label: 'J/P',
                            data: data.jpScore,
                            borderColor: 'rgba(153, 102, 255, 1)',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            tension: 0,
                            fill: true,
                        },
                    ],
                });
                setLoading(false);  // 데이터를 성공적으로 받아오면 로딩 해제
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);  // 에러 발생 시 로딩 해제
            });
    };

    useEffect(() => {
        fetchData(type);
    }, [type]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    font: {
                        weight: 'bold',
                    },
                }
            },
            title: {
                position: 'bottom',
                display: true,
                text: `${childInfo?.name || '자녀'}님의 히스토리`,
                font: {
                    family: 'UhBeeSe_hyun',
                    weight: 'bold',
                    size: '16rem'
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
                    },
                },
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {
                    callback: function (value) {
                        return `${value}%`;
                    },
                },
            },
        },
    };

    return (
        <div>
            <Header />
            <div className="main-container">
                <div className="chart-container">
                    <h2 className="chart-title">MBTI 히스토리 차트</h2>

                    {/* 차트 영역 */}
                    <div className="chart-wrapper">
                        {loading ? (
                            <div>Loading...</div>
                        ) : chartData ? (
                            <>
                                <div className="period-selector">
                                    <label>
                                        <input
                                            type="radio"
                                            value="daily"
                                            checked={type === 'daily'}
                                            onChange={() => setType('daily')}
                                        />
                                        일별
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="weekly"
                                            checked={type === 'weekly'}
                                            onChange={() => setType('weekly')}
                                        />
                                        주별
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="monthly"
                                            checked={type === 'monthly'}
                                            onChange={() => setType('monthly')}
                                        />
                                        월별
                                    </label>
                                </div>
                                <Line data={chartData} options={options} />
                            </>
                        ) : (
                            <div>데이터가 없습니다.</div>
                        )}
                        <div className="chart_info_text">
                            * 그래프 수치가 50% 이상일수록 외향적(E), 현실적(S), 논리적(T), 계획적(J) 성향이 높습니다.
                        </div>
                    </div>
                </div>
            </div>
            <NavBar />
        </div>
    );
}
