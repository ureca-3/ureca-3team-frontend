import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_DOMAIN } from '../../api/domain';

const AdminContents = () => {

  const [bookData, setBookData] = useState('');
  const { content } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [poster, setPoster] = useState(''); // 기본 포스터
  const [showModal, setShowModal] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    // console.log(token);
    if (token) {
      setAccessToken(token);
    }
  }, []);


  const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="modal-title">주의</h2>
          <p>{message}</p>
          <div className="modal-actions">
            <button className="confirm-button" onClick={onConfirm}>Yes</button>
            <button className="cancel-button" onClick={onCancel}>No</button>
          </div>
        </div>
      </div>
    );
  };

  const editContent = () => {
    // console.log("수정 버튼");
    window.location.href = `http://localhost:3000/adminEdit/${content}`;
  }

  const deleteContent = async () => {
    try {
      const response = await axios.patch(`${API_DOMAIN}/contents/admin/delete/${content}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      window.location.href = `http://localhost:3000/admin`;
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    deleteContent();
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const getData = async (accessToken) => {
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
  }


  useEffect(() => {
    if (content && accessToken) getData(accessToken);
  }, [content, accessToken]);

  return (
    <div>
      <Header></Header>
      <div className='main-container'>
        <div className="book-detail-container">
          <div className="book-image">
            <img src={poster} alt="책 이미지" />
          </div>

          <div className="book-info">
            <h2 className="book-title">{title}</h2>
            <p className="book-author">{publisher}<br />{author} 지음</p>

            <p className="book-description">
              {description}
            </p>

            <span className="mbti">{bookData.contentsMbtiResult}</span>

            <div className="book-actions">
              <button className="edit-button" onClick={editContent}>수정</button>
              <button className="delete-button" onClick={handleDeleteClick}>삭제</button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ConfirmationModal
          message="정말 삭제하시겠습니까?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default AdminContents;
