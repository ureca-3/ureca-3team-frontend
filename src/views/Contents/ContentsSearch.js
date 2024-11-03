import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { API_DOMAIN } from '../../api/domain';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './searchStyle.css';

const ContentsSearch = () => {
    const [accessToken, setAccessToken] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const searchKeyword = (localStorage.getItem("keyword") || '');
        setAccessToken(token);
        setKeyword(searchKeyword);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const newKeyword = (localStorage.getItem("keyword") || '');
            if (newKeyword !== keyword) {
                setKeyword(newKeyword);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [keyword]);

    useEffect(() => {
        if (accessToken && keyword) {
            getSearchData(accessToken, keyword);
            getData(accessToken);
        }
    }, [accessToken, keyword]);


    const getData = async (accessToken) => {
        const kakaoUser = await axios.get(`${API_DOMAIN}/auth/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        setUserRole(kakaoUser.data.result.role);
    }

    const getSearchData = async (accessToken, keyword) => {
        try {
            const response = await axios.get(`${API_DOMAIN}/contents/search`, {
                params: {
                    keyword: keyword
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setSearchData(response.data.result);
            console.log(searchData);
        } catch (error) {
            console.error(error);
            setSearchData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const goDetail = (contentId) => {
        if (userRole === 'ADMIN') navigate(`/adminContents/${contentId}`);
        if (userRole === 'USER') navigate(`/contentsDetail/${contentId}`);
    }

    return (
        <div style={{ backgroundColor: '#ffe7eb', minHeight: '100vh' }}>
            <Header />
            <div className='search-containers'>
                <h3 className="search-header" style={{ textAlign: 'center' }}>{keyword} 검색 결과</h3>
                <div className='search-book-container'>
                    {isLoading ? (
                        <p className='loading'>Loading...</p>
                    ) : searchData ? (
                        <>
                            {searchData.map((content, index) => (
                                <div key={index} className="content-items" onClick={() => goDetail(content.id)}>
                                    <img src={content.posterUrl} alt={content.title} className="contents-poster" />
                                    <div className="content-details">
                                        <p className="content-title" title={content.title}>{content.title || "제목 없음"}</p>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <p className="no-results">{decodeURIComponent(keyword)}에 대한 결과가 없습니다.</p>
                        </div>)}
                </div>
            </div>
        </div>
    );
}
export default ContentsSearch;
