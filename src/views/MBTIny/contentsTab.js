import '../Page.css';
import './style/contents.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_DOMAIN } from "../../api/domain";
import { useNavigate } from 'react-router-dom';

export default function ContentsTab() {
    const [accessToken, setAccessToken] = useState('');
    const [contentsData, setContentsData] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setAccessToken(token);
    }, [])

    useEffect(() => {
        if (accessToken) {
            getData(accessToken, currentPage);
        }
    }, [accessToken, currentPage]);

    const getData = async (accessToken, page) => {
        try {
            const response = await axios.get(`${API_DOMAIN}/contents/all`,
                {
                    params: { page, size: 15 },
                    headers:
                    {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            setContentsData(response.data.result.content);
            setTotalPages(response.data.result.totalPages);
        } catch (error) {
            setContentsData([]);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="contentTab-recommd-main-container">
            <div className="contentTab-recommd-content-container">
                <div className="contentTab-recommended-books">
                    <div className="contentTab-book-container">
                        {contentsData ?
                            contentsData.map((content, index) => (
                                <div
                                    className="book-item"
                                    key={index}
                                    onClick={() => navigate(`/contentsDetail/${content.id}`, { state: { originTab: 'contents' } })}
                                >
                                    <img src={content.posterUrl || "../img/avatar.png"} alt={content.title} className="book-cover" />
                                    <p className="book-title" title={content.title}>{content.title || "제목 없음"}</p>
                                </div>
                            ))
                            : <>데이터가 없습니다.</>}
                    </div>
                </div>
            </div>

            {/* <div className="pagination">
                <span className="pagination-arrow" onClick={goToPreviousPage} disabled={currentPage === 0}>◀</span>
                {[...Array(totalPages)].map((_, index) => (
                    <span
                        key={index}
                        className={`pagination-page-number ${currentPage === index ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index)}
                    >
                        {index + 1}
                    </span>
                ))}
                <span className="pagination-arrow" onClick={goToNextPage} disabled={currentPage === totalPages - 1}>▶</span>
            </div> */}



        </div>
    )
}