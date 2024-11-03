import React, { useState } from 'react';
import './EventPage.css';
import Header from '../../components/Header';
import axios from 'axios';
import { API_DOMAIN } from '../../api/domain';

const EventPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    try {
        await axios.post(`${API_DOMAIN}/event/apply`, {
            name,
            phone
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setMessage('응모가 완료되었습니다!');
    } catch (error) {
        console.error('응모 실패:', error);
        setMessage('응모에 실패했습니다. 다시 시도해 주세요.');
    }
};

  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="event-wrapper">
          <h2>이벤트 응모 페이지</h2>
          <form onSubmit={handleSubmit} className="event-form">
            <div className="form-group">
              <label>성함:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>전화번호:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">응모하기</button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default EventPage;