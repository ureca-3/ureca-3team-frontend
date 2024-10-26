import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_DOMAIN } from '../../api/domain';
import { FaRegFrown, FaRegLaughSquint } from "react-icons/fa";
const ContentsDetail = () => {
  const [bookData, setBookData] = useState('');
  const { content } = useParams();
  const [accessToken, setAccessToken] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [poster, setPoster] = useState(''); // 기본 포스터
  const [showModal, setShowModal] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);

  const toggleLaughColor = () => {
    setActiveIcon(activeIcon === 'laugh' ? null : 'laugh');
  };

  const toggleFrownColor = () => {
    setActiveIcon(activeIcon === 'frown' ? null : 'frown');
  };

  const getData = async () => {
    const response = await axios.get(`${API_DOMAIN}/contents/read/${content}`,
      {
        headers:
        {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    setBookData(response.data.result); setPoster(response.data.result.posterUrl);
    setTitle(response.data.result.title); setDescription(response.data.result.description);
    setAuthor(response.data.result.author); setPublisher(response.data.result.publisher);
    if (bookData.publicationYear) {
      const formattedDate = new Date(bookData.publicationYear).toISOString().split('T')[0];
      setPublicationYear(formattedDate);
    }
    console.log(bookData);
  }

  useEffect(() => {
    if (content) getData();
  }, [content]);


  return (
    <div>
      <Header></Header>
      <div className='main-container'>
        <div className="book-detail-container">
          <div className="book-image">
            <img src={poster} alt="책 이미지" />
            <div style={{ marginTop: '15px' }}>
              <FaRegLaughSquint
                style={{
                  marginRight: '50px',
                  fontSize: '24px',
                  color: activeIcon === 'laugh' ? 'red' : 'black',
                }}
                onClick={toggleLaughColor}
              />
              <FaRegFrown
                style={{
                  fontSize: '24px',
                  color: activeIcon === 'frown' ? 'red' : 'black',
                }}
                onClick={toggleFrownColor}
              />
            </div>
          </div>

          <div className="book-info">
            <h2 className="book-title">{title}</h2>
            <p className="book-author">{publisher}<br />{author} 지음</p>

            <p className="book-description">
              {description}
            </p>

            <span className="mbti">{bookData.contentsMbtiResult}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentsDetail;
