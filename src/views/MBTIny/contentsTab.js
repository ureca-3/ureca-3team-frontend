import '../Page.css';
import './style/contents.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_DOMAIN } from "../../api/domain";
import { useNavigate } from 'react-router-dom';

export default function ContentsTab() {
    const [accessToken, setAccessToken] = useState('');
    const [contentsData, setContentsData] = useState([]);
    const [selectedType, setselectedType] = useState("all"); // MBTI 필터 상태 추가

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setAccessToken(token);
    }, [])

    useEffect(() => {
        if (accessToken) {
            getData(accessToken, selectedType);
        }
    }, [accessToken, selectedType]);

    const getData = async (accessToken, type) => {
        try {
            const response = await axios.get(`${API_DOMAIN}/contents/all`,
                {
                    params: 
                    { 
                        contentsType: type 
                    },
                    headers:
                    {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            console.log("Data fetched:", response.data);
            setContentsData(response.data.result);
        } catch (error) {
            console.error("Failed to fetch data:", error); // 오류 내용 출력
            setContentsData([]);
        }
    };

    const handleMbtiChange = (event) => {
        console.log("~~~",event.target.value);
        setselectedType(event.target.value); // 선택한 MBTI 값을 상태에 저장
    };

    return (
        <div className="contentTab-recommd-main-container">
            <div className="contentTab-filter">
                <label htmlFor="mbti-select">MBTI 타입 : </label>
                <select id="mbti-select" value={selectedType} onChange={handleMbtiChange}>
                    <option value="all">전체</option>
                    {["ISTJ", "ISFJ", "ISTP", "ISFP", "INTJ", "INFJ", "INTP", "INFP", "ESTJ", "ESFJ", "ESTP", "ESFP", "ENTJ", "ENFJ", "ENTP", "ENFP"].map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="contentTab-recommd-content-container">
                <div className="contentTab-recommended-books">
                    <div className="contentTab-book-container">
                        {contentsData && contentsData.length > 0 ?
                            contentsData.map((content, index) => (
                                <div className="book-item" key={index} onClick={() => navigate(`/contentsDetail/${content.bookId}`, { state: { originTab: 'contents' } })}>
                                    <img src={content.profileUrl || "../img/avatar.png"} alt={content.title} className="book-cover" />
                                    <p className="book-title" title={content.title}>{content.title || "제목 없음"}</p>
                                </div>
                            ))
                            : (
                                <div className="no-data-message">해당하는 타입의 도서가 없습니다.</div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}