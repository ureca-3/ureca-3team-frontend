import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 스타일
import axios from 'axios';
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import './style/register.css';
import '../Page.css';


export default function ChildRegister() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const profileUrl = "";
    const [confirmMsg, setConfirmMsg] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

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
    }

    const goAssessment = async (event) => {
        event.preventDefault(); // 폼 기본 동작 방지
        if (validation()) {

            // 데이터 객체 생성
            const formData = {
                name: name,
                gender: gender,
                birthday: birthday.toISOString().split('T')[0], // YYYY-MM-DD 형식으로 변환
                profileUrl: profileUrl,
                age: parseInt(age, 10) // 숫자 형태로 변환
            };


            // const token = localStorage.getItem('token');
            const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTczMDYwOTM0MSwiaWF0IjoxNzMwMDkwOTQxLCJpZCI6MSwicm9sZXMiOiJST0xFX1VTRVIifQ.Bj9Oy2TdrgJs6nvmP0JybSjfLzgCIWTirXQS5KXy4Zsi5ynKXFp2FC1OQvTeZ-3Wx44T-vjoGWlJYQhN5T0sYg';
            // 토큰이 null인지 확인하여 오류 방지
            if (!token) {
                setConfirmMsg('인증 토큰이 없습니다.');
                setShowConfirm(true);
                return;
            }

            // axios를 사용한 POST 요청
            axios.post('http://localhost:8080/api/v1/child', formData, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
    }
    return (
        <div>
            <Header showLoginInfoOnly={true} />
            <div className="register-main-container">
                <div className="register-content-container">
                    <h1 className="title">우리 아이 등록해요</h1>
                    <div className="profile-icon"></div>
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
                                dateFormat="yyyy-MM-dd" // 날짜 형식
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

                {/* 커스텀 컨펌 창 */}
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
