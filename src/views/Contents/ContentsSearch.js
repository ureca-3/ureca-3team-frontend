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
        <div className='search-container'>
            <Header />
            <div style={{backgroundColor : '#FFE7EB'}}>
            <h3 className="search-header" style={{textAlign:'flex-start' }}>{keyword} 검색 결과 :</h3>
            </div>
            <div className='main-container'>
                {isLoading ? (
                    <p className='loading'>Loading...</p>
                ) : searchData? (
                    <>
                            {searchData.map((content, index) => (
                                <div key={index} className="content-item" onClick={() => goDetail(content.id)}>
                                    <img src={content.posterUrl} alt={content.title} className="content-poster" />
                                    <div className="content-details">
                                        <span className="content-title">{content.title}</span>
                                    </div>
                                </div>
                            ))}
                    </>
                ) : (
                    <h2 className="no-results">{decodeURIComponent(keyword)}에 대한 결과가 없습니다.</h2>
                )}
            </div>
        </div>
    );
};

export default ContentsSearch;
