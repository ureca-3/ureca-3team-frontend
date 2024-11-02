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
  const [poster, setPoster] = useState('');
  const [activeIcon, setActiveIcon] = useState(null);
  const [childId, setChildId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const originTab = location.state?.originTab || 'contents';
  const [feedback, setFeedback] = useState('');
  const [confirmMsg, setConfirmMsg] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAccessToken(token);
    }

    const childId = localStorage.getItem("childId");
    if (childId) {
      setChildId(childId);
    }
  }, []);

  const handleFeedbackError = (action) => {
    const message = action === "like"
      ? '이미 "싫어요"의 피드백을 주셨어요! "싫어요"를 취소하고 다시 피드백을 주세요!'
      : '이미 "좋아요"의 피드백을 주셨어요! "좋아요"를 취소하고 다시 피드백을 주세요!'
    setConfirmMsg(message);
    setShowConfirm(true);
  };

  const toggleLaughColor = () => {
    if (feedback === 'DISLIKE') {
      handleFeedbackError("like");
      return;
    }

    setActiveIcon(activeIcon === 'laugh' ? null : 'laugh');
    axios.post(`${API_DOMAIN}/feedback/child/${childId}/content/${content}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then(response => {
      setFeedback(feedback === null ? 'LIKE' : null);
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  };

  const toggleFrownColor = () => {
    if (feedback === 'LIKE') {
      handleFeedbackError("dislike");
      return;
    }

    setActiveIcon(activeIcon === 'frown' ? null : 'frown');
    axios.post(`${API_DOMAIN}/feedback/child/${childId}/content/${content}/dislike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      }
    ).then(response => {
      setFeedback(feedback === null ? 'DISLIKE' : null);
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  };

  const goBack = () => {
    navigate('/main', { state: { activeTab: originTab } });
  };

  const getData = async (accessToken) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/contents/read/${content}?childId=${childId}`,
        {
          headers:
          {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const result = response.data.result;
      setBookData(result);
      setPoster(result.posterUrl);
      setTitle(result.title);
      setDescription(result.description);
      setAuthor(result.author);
      setPublisher(result.publisher);
      setFeedback(result.feedBackType);

      if (result.publicationYear) {
        const formattedDate = new Date(result.publicationYear).toISOString().split('T')[0];
        setPublicationYear(formattedDate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (content && accessToken) getData(accessToken);
  }, [content, accessToken]);

  useEffect(() => {
    if (feedback === 'LIKE') {
      setActiveIcon('laugh');
    } else if (feedback === 'DISLIKE') {
      setActiveIcon('frown');
    } else {
      setActiveIcon(null);
    }
  }, [feedback]);

  return (
    <div>
      <Header />
      <div className='main-container'>
        <div className="content-wrapper">
          <div className="book-detail-container">
            <div className="book-image" style={{ marginLeft: '20px' }}>
              <span className="mbti">{bookData.contentsMbtiResult}</span>
              <img src={poster} alt="Book" />
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
              <p className="book-author">{publisher}<br />{author}</p>
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

        {showConfirm && (
          <div className="confirm-overlay">
            <div className="confirm-container" style={{ whiteSpace: 'pre-line' }}>
              <p>{confirmMsg}</p>
              <button onClick={() => setShowConfirm(false)} className="confirm-button">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentsDetail;
