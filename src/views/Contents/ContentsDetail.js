import React, { useEffect, useState } from 'react';
import './styles.css';
import '../Page.css';
import Header from '../../components/Header';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { API_DOMAIN } from '../../api/domain';
import { FaRegFrown, FaRegLaughSquint } from "react-icons/fa";
import ContentsMbtiResult from './ContentsMbtiResult';

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
  const [activeIcon, setActiveIcon] = useState(null);
  const [childId, setChildId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const originTab = location.state?.originTab || 'contents';

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAccessToken(token);
      // console.log(accessToken);
    }

    const childId = localStorage.getItem("childId");
    if (childId) {
      setChildId(childId);
    }
  }, []);

  const toggleLaughColor = () => {
    setActiveIcon(activeIcon === 'laugh' ? null : 'laugh');
    axios.post(`${API_DOMAIN}/contents/${content}/like`,
      JSON.stringify({
        childId: childId
      }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      }
    );
  };

  const goBack = () => {
    // navigate('/main', { state: { activeTab: 'recommends' } });
    navigate('/main', { state: { activeTab: originTab } });
  }

  const toggleFrownColor = () => {
    setActiveIcon(activeIcon === 'frown' ? null : 'frown');
  };

  const getData = async (token) => {
    try {
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
      // console.log(bookData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (content && accessToken) getData(accessToken);
  }, [content, accessToken]);


  return (
    <div>
      <Header></Header>
      <div className='main-container'>
        <div className="content-wrapper">

          <div className="book-detail-container">
            <div className="book-image" style={{ marginLeft: '20px' }}>
              <span className="mbti">{bookData.contentsMbtiResult}</span>

              <img src={poster} alt="책 이미지" />
              <div style={{ marginTop: '15px' }}>
                {/** 좋아요 버튼 */}
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

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40%', marginLeft: '-50px' }}>
                <ContentsMbtiResult contentId={content} />
              </div>
            </div>

          </div>
          <div className="button-container">
            <button class="save-button" onClick={goBack}>돌아가기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentsDetail;