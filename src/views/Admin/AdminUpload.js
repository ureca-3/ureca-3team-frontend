import React, { useRef, useState, useEffect } from 'react';
import './styles.css';
import Header from '../../components/Header';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import { API_DOMAIN, CLIENT_DOMAIN } from '../../api/domain';
import noImage from './no-image.png';
import DatePicker from 'react-datepicker';

const AdminUpload = () => {
    const [accessToken, setAccessToken] = useState('');
    const [fileName, setFileName] = useState('');
    const [poster, setPoster] = useState(noImage); // 기본 포스터
    const fileInputRef = useRef(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publicationYear, setPublicationYear] = useState('');

    // 로딩 상태 추가
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        // console.log(token);
        if (token) {
            setAccessToken(token);
        }
    }, []);

    const saveContent = async () => {
        setIsLoading(true); // 로딩 시작
        try {
            const response = await axios.post(
                `${API_DOMAIN}/contents/admin/save`,
                JSON.stringify({
                    title: title,
                    posterUrl: poster,
                    description: description,
                    author: author,
                    publisher: publisher,
                    publicationYear: publicationYear
                }),
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": 'application/json'
                    },
                }
            );

            const contentId = response.data.result;
            window.location.href = `${CLIENT_DOMAIN}/adminContents/${contentId}`;
        } catch (error) {
            console.error('Error saving content:', error);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setFileName(file.name);
            setPoster(fileUrl);
        }
    }

    const handleIconClick = () => {
        fileInputRef.current.click();
    }

    return (
        <div>
            <Header />
            <div className='main-container' style={{ display: 'flex', justifyContent: 'space-between' }}>

                {isLoading && (
                    <div className="loading-overlay">
                        <div className="loading-popup">
                            <div className="loading-spinner"></div>
                            <p>저장 중입니다... 잠시만 기다려주세요.</p>
                        </div>
                    </div>
                )}
                <div style={{ display: 'flex', marginLeft:'20%' }}>
                    {/* 포스터 업로드 */}
                    <div className='upload-image'>
                        <button className='save-button' onClick={saveContent}>저장</button>
                        <img src={poster}></img>
                        <div>
                            <input
                                type="text"
                                value={fileName}
                                placeholder="Choose a file..."
                                readOnly
                                style={{
                                    width: '200px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    marginRight: '10px',
                                }}
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <button
                                onClick={handleIconClick}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: 'pink',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                <FaUpload />
                            </button>
                        </div>
                    </div>
                    {/** 기타 입력 */}
                    <div style={{ flexDirection: 'column', marginTop: '10px', marginLeft: '100px' }}>
                        <div className='input-fields'>
                            <h3 className='input-title'>제목</h3>
                            <input
                                type="text"
                                placeholder="제목"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className='input-fields'>
                            <h3 className='input-title'>줄거리</h3>
                            <textarea
                                type="text"
                                placeholder="줄거리"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className='input-fields'>
                            <h3 className='input-title'>지은이</h3>
                            <input
                                type="text"
                                placeholder="지은이"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>

                        <div className='input-fields'>
                            <h3 className='input-title'>출판사</h3>
                            <input
                                type="text"
                                placeholder="출판사"
                                value={publisher}
                                onChange={(e) => setPublisher(e.target.value)}
                            />
                        </div>

                        <div className='input-fields'>
                            <h3 className='input-title'>출판년월일</h3>
                            <DatePicker
                                selected={publicationYear}
                                onChange={(date) => setPublicationYear(date)}
                                dateFormat="yyyy-MM-dd"
                                className="custom-datepicker-input"
                                showPopperArrow={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminUpload;
