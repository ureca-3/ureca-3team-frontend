import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import { API_DOMAIN, CLIENT_DOMAIN } from '../../api/domain';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import imageCompression from 'browser-image-compression';

const AdminEdit = () => {
    const [accessToken, setAccessToken] = useState('');
    const { content } = useParams();
    const [fileName, setFileName] = useState('');
    const [poster, setPoster] = useState(''); // 기본 포스터
    const fileInputRef = useRef(null);
    const [bookData, setBookData] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        // console.log(token);
        if (token) {
            setAccessToken(token);
        }
    }, []);

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
        if (response.data.result.publicationYear) {
            const formattedDate = new Date(response.data.result.publicationYear).toISOString().split('T')[0];
            setPublicationYear(formattedDate);
        }
        // console.log(bookData);
    }
    useEffect(() => {
        if (content && accessToken) getData(accessToken);
    }, [content, accessToken]);


    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const options = {
                maxSizeMB: 1,
                maxWithOrHeight: 1000,
            }

            const compressedFile = await imageCompression(file, options);
            const reader = new FileReader();

            reader.onload = () => {
                setImgSrc(reader.result);
                setPoster(compressedFile);
                setFileName(compressedFile.name);
            }
            reader.readAsDataURL(compressedFile);
        }
    }

    const handleIconClick = () => {
        fileInputRef.current.click();
    }

    const saveContent = async () => {
        // 변경된 데이터만 추출
        const changes = {};
        if (title !== bookData.title) changes.title = title;
        if (description !== bookData.description) changes.description = description;
        if (author !== bookData.author) changes.author = author;
        if (publisher !== bookData.publisher) changes.publisher = publisher;
        if (publicationYear !== bookData.publicationYear) changes.publicationYear = publicationYear;

        // 서버에 전송할 데이터가 존재할 때만 요청 실행
        if (Object.keys(changes).length > 0 || poster) {
            try {

                const formData = new FormData();
                formData.append("request",
                    new Blob([JSON.stringify(changes)], { type: 'application/json' }));

                if (poster !== bookData.poster ) formData.append("newImage", poster);

                const response = await axios.patch(
                    `${API_DOMAIN}/contents/admin/update/${content}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                );

            } catch (error) {
                console.error(error);
            }
        }
        window.location.href = `${CLIENT_DOMAIN}/adminContents/${content}`;

    };
    return (
        <div>
            <Header />
            <div className='main-container' style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div style={{ display: 'flex', marginLeft: '20%' }}>
                    {/* 포스터 업로드 */}
                    <div className='upload-image'>
                        <button className='save-button' onClick={saveContent}>수정</button>
                        <img src={imgSrc || poster}></img>
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
export default AdminEdit;
