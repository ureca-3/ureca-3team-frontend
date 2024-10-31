import Header from "../../components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_DOMAIN } from "../../api/domain";
import { useNavigate } from 'react-router-dom';
import './AdminMain.css';

const AdminMain = () => {
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
                    params: { page, size: 5 },
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
        <div>
            <Header />
            <div className='main-container' >
                {contentsData ?
                    contentsData.map((content, index) => (
                        <div key={index} className="content-item" onClick={() => navigate(`/adminContents/${content.id}`)}>
                            <img src={content.posterUrl} alt={content.title} className="content-poster" />
                            <div className="content-details">
                                <span className="content-title">{content.title}</span>
                            </div>
                        </div>))
                    : <>데이터가 없습니다.</>}
            </div>

            <div className="pagination" >
                <button onClick={goToPreviousPage} disabled={currentPage === 0}>Previous</button>
                <span>Page {currentPage + 1} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>Next</button>
            </div>
        </div>
    )
}

export default AdminMain;