import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { API_DOMAIN } from '../../api/domain';
import './style/register.css';
import '../Page.css';
import imageCompression from 'browser-image-compression';

export default function ChildRegister() {
    localStorage.removeItem("childId");

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [confirmMsg, setConfirmMsg] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [profileUrl, setProfileUrl] = useState('/img/avatar.png');
    const [imgSrc, setImgSrc] = useState('');
    const fileInputRef = useRef();

    // validation check
    const validation = () => {
        if (name.length < 2) {
            setConfirmMsg("이름은 최소 2자 이상 입력해야 합니다.");
            setShowConfirm(true);
            return false;
        }
        if (!birthday) {
            setConfirmMsg("생년월일을 선택해 주세요.");
            setShowConfirm(true);
            return false;
        }
        if (!/^\d+$/.test(age) || age <= 0) {
            setConfirmMsg("나이는 0보다 큰 숫자로 입력해야 합니다.");
            setShowConfirm(true);
            return false;
        }
        if (!gender) {
            setConfirmMsg("성별을 선택해 주세요.");
            setShowConfirm(true);
            return false;
        }
        return true;
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1000
            };

            const compressedFile = await imageCompression(file, options);
            const reader = new FileReader();

            reader.onload = () => {
                setImgSrc(reader.result);
                setProfileUrl(compressedFile);
            };

            reader.readAsDataURL(compressedFile);
        }
    };

    const goAssessment = async (event) => {
        event.preventDefault(); // 폼 기본 동작 방지

        const formData = new FormData();

        if (validation()) {
            formData.append("childRequest", new Blob([JSON.stringify({
                name: name,
                gender: gender,
                birthday: birthday.toISOString().split('T')[0],
                age: parseInt(age, 10)
            })], { type: 'application/json' }));

            if (profileUrl === '/img/avatar.png') {
                const response = await fetch(profileUrl); // 기본 이미지를 Blob으로 변환
                const blob = await response.blob();
                formData.append("image", blob); // 기본 이미지 전송
            } else {
                formData.append("image", profileUrl); // 사용자가 업로드한 이미지 전송
            }
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setConfirmMsg('인증 토큰이 없습니다.');
                setShowConfirm(true);
                return;
            }



            axios.post(`${API_DOMAIN}/child`, formData, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    console.log('Success:', response.data);
                    const child_id = response.data.result;

                    navigate(`/mbtiStart`, {
                        state: {
                            child_id: child_id
                        }
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setConfirmMsg('서버에 오류가 발생했습니다.\n다시 시도해 주세요.');
                    setShowConfirm(true);
                });
        };
    };

    return (
        <div>
            <Header showLoginInfoOnly={true} />
            <div className="register-main-container">
                <div className="register-content-container">
                    <h1 className="title">우리 아이 등록해요</h1>
                    <div className="profile-icon" onClick={handleUploadClick}>
                        <img src={imgSrc || profileUrl} alt="Profile" />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <form className="register-form" onSubmit={goAssessment}>
                        <label>
                            이름
                            <input
                                type="text"
                                placeholder="ex) 홍길동"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            생년월일
                            <DatePicker
                                selected={birthday}
                                onChange={(date) => setBirthday(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="생년월일을 선택하세요."
                                className="custom-datepicker-input"
                                showPopperArrow={false}
                            />
                        </label>
                        <label>
                            나이
                            <input
                                type="text"
                                placeholder="ex) 7"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </label>
                        <div className="gender-container">
                            <span className="gender-label">성별</span>
                            <div className="gender-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gender === 'MALE'}
                                        onChange={() => setGender('MALE')}
                                    />
                                    남자
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={gender === 'FEMALE'}
                                        onChange={() => setGender('FEMALE')}
                                    />
                                    여자
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="submit-button">등록하기</button>
                    </form>
                </div>

                {showConfirm && (
                    <div className="confirm-overlay">
                        <div className="confirm-container">
                            <p style={{ whiteSpace: 'pre-line' }}>{confirmMsg}</p>
                            <button onClick={() => setShowConfirm(false)} className="confirm-button">확인</button>
                        </div>
                    </div>
                )}
            </div>
            <NavBar />
        </div>
    );
}
