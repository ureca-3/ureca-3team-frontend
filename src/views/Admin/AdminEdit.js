import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import { API_DOMAIN } from '../../api/domain';
import { useParams } from 'react-router-dom';

const AdminEdit = () => {
    const [accessToken, setAccessToekn] = useState('');
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
        if (response.data.result.publicationYear) {
            const formattedDate = new Date(response.data.result.publicationYear).toISOString().split('T')[0];
            setPublicationYear(formattedDate);
        }
        console.log(bookData);
    }


    useEffect(() => {
        if (content) getData();
    }, [content]);


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

    const saveContent = async () => {
        // 변경된 데이터만 추출
        const changes = {};
        if (title !== bookData.title) changes.title = title;
        if (poster !== bookData.posterUrl) changes.posterUrl = poster;
        if (description !== bookData.description) changes.description = description;
        if (author !== bookData.author) changes.author = author;
        if (publisher !== bookData.publisher) changes.publisher = publisher;
        if (publicationYear !== bookData.publicationYear) changes.publicationYear = publicationYear;

        // 서버에 전송할 데이터가 존재할 때만 요청 실행
        if (Object.keys(changes).length > 0) {
            try {
                const response = await axios.patch(
                    `${API_DOMAIN}/contents/update/${content}`,
                    changes,
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
        window.location.href = `http://localhost:3000/adminContents/${content}`;

    };
    return (
        <div>
            <Header />
            <div className='main-container' style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div style={{ display: 'flex' }}>
                    {/* 포스터 업로드 */}
                    <div className='upload-image'>
                        <button className='save-button' onClick={saveContent}>수정</button>
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
                            <input
                                type="date"
                                placeholder="출판년월일"
                                value={publicationYear}
                                onChange={(e) => setPublicationYear(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminEdit;
