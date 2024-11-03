import React, { useState } from 'react';
import axios from 'axios';
import './eventApply.css';
import { API_DOMAIN } from '../../api/domain';

const EventApply = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${API_DOMAIN}/event/apply`, {
                name,
                phone
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            setMessage("응모가 완료되었습니다!");
            setName('');
            setPhone('');
        } catch (error) {
            setMessage("응모에 실패했습니다. 다시 시도해주세요.");
            console.error("응모 오류:", error);
        }
    };

    return (
        <div className="event-apply-container">
            <h2>이벤트 응모</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="event-apply-form">
                <label>
                    성함:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    전화번호:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">응모하기</button>
            </form>
        </div>
    );
};

export default EventApply;