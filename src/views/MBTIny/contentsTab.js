import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';
import './style/contents.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_DOMAIN } from "../../api/domain";
import { useNavigate } from 'react-router-dom';

export default function ContentsTab() {
    return (
        
            <div className="main-container">
                <h2>콘텐츠 목록페이지</h2>
            </div>
           
    );
}