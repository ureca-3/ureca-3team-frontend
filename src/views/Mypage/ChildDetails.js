import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import { API_DOMAIN } from '../../api/domain';
import { useParams } from 'react-router-dom';

const ChildDetails = () => {
    const [accessToken, setAccessToken] = useState('');
    const { child } = useParams();

    return (
        <div>
            <Header />
            <div className="main-container">
                자녀 상세 정보
            </div>
        </div>
    );
}


export default ChildDetails;
