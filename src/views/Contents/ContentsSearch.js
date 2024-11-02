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
    const { keyword } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setAccessToken(token);
    }, [])

    useEffect(() => {
        if (accessToken && keyword) {
            getSearchData(accessToken);
        }
    }, [accessToken, keyword]);

    const getSearchData = async (accessToken) => {
        const response = await axios.get(`${API_DOMAIN}/contents/search/${keyword}`,
            {
                headers:
                {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        setSearchData(response.data.result);
        // console.log(response.data.result);
    };

    return (
        <div>
            <Header />
            <div className='main-container'>
                {searchData.map((content, index) => (
                    <div key={index} className="content-item" onClick={() => navigate(`/${content.id}`)}>
                        <img src={content.posterUrl} alt={content.title} className="content-poster" />
                        <div className="content-details">
                            <span className="content-title">{content.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContentsSearch;