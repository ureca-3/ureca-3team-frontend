import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WinnerMain.css';
import Header from '../../components/Header';
import { API_DOMAIN } from '../../api/domain';


const WinnerMain = () => {
    const [winners, setWinners] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await axios.get(`${API_DOMAIN}/logHistory/winners`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                });
                setWinners(response.data.result);
            } catch (error) {
                setError('데이터를 가져오는 데 실패했습니다.');
                console.error("Error fetching winners:", error);
            }
        };

        fetchWinners();
    }, []);

    return (
        <div>
            <Header />
            <div className="winner-main-container">
                <h2 className="centered-text">당첨자 명단</h2>
                {error && <p className="centered-text error-message">{error}</p>}
                <ul className="winner-list">
                    {winners.map((winner) => (
                        <li key={winner.id} className="winner-item">
                            {winner.name} - {winner.phone}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WinnerMain;
