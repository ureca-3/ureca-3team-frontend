import Header from "../../components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_DOMAIN } from "../../api/domain";
import { useNavigate } from 'react-router-dom';
import './AdminMain.css';

const AdminMain = () => {
    const [accessToken, setAccessToken] = useState('');
    const [contentsData, setContentsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setAccessToken(token);
    }, [])

    useEffect(() => {
        if (accessToken) {
            getData(accessToken);
        }
    }, [accessToken]);

    const getData = async (accessToken) => {
        const response = await axios.get(`${API_DOMAIN}/contents/all`,
            {
                headers:
                {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        setContentsData(response.data.result);
        // console.log(response.data.result);
    };
    
    return (
        <div>
            <Header />
            <div className='main-container' >
                {contentsData.map((content, index) => (
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

export default AdminMain;