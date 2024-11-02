import React, { useEffect, useRef, useState } from 'react';
import './MyPageStyles.css';
import Header from '../../components/Header';
import axios from 'axios';
import { API_DOMAIN } from '../../api/domain';
import DatePicker from 'react-datepicker';
import imageCompression from 'browser-image-compression';

const ChildDetails = () => {
  const [accessToken, setAccessToken] = useState('');
  const [childId, setChildId] = useState('');
  const [childData, setChildData] = useState('');
  const [activeData, setActiveData] = useState([]);
  const [resultYn, setResultYn] = useState([]);
  const [eiScore, setEiScore] = useState('');
  const [snScore, setSnScore] = useState('');
  const [tfScore, setTfScore] = useState('');
  const [jpScore, setJpScore] = useState('');
  const [mbti, setMbti] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedGender, setEditedGender] = useState('');
  const [editedBirthday, setEditedBirthday] = useState('');
  const [editedProfile, setEditedProfile] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAccessToken(token);
    }

    const currentChildId = localStorage.getItem("childId");
    if (currentChildId) {
      setChildId(currentChildId);
      fetchChildData(currentChildId, token);
      getChildMbtiData(currentChildId, token);
    }
  }, []);

  const fetchChildData = (childId, token) => {
    axios.get(`${API_DOMAIN}/child/${childId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setChildData(response.data.result);
        setEditedName(response.data.result.name);
        setEditedGender(response.data.result.gender);
        setEditedBirthday(response.data.result.birthday);
        setEditedProfile(response.data.result.profileUrl);
      });
  };

  const getChildMbtiData = (childId, token) => {
    axios.get(`${API_DOMAIN}/assessment/${childId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const mbtiData = response.data?.result || [];
        const activeData = mbtiData.find(item => item.status === "ACTIVE");
        if (activeData) {
          setActiveData(activeData);
          setMbti(activeData.mbtiResult);
          setEiScore(activeData.eiScore);
          setJpScore(activeData.jpScore);
          setSnScore(activeData.snScore);
          setTfScore(activeData.tfScore);
          setResultYn(true);
        } else {
          setResultYn(false);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
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
  const handleConfirm = () => {
    if (
      childData.name !== editedName ||
      childData.gender !== editedGender ||
      childData.birthday !== editedBirthday
    ) {
      const updatedData = {
        name: editedName,
        gender: editedGender,
        birthday: editedBirthday,
      };

      axios
        .patch(`${API_DOMAIN}/child/${childId}`, updatedData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          setIsEditing(false);
          fetchChildData(childId, accessToken);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // 프로필 사진 변경
    if (profileUrl && profileUrl !== childData.profileUrl) {
      const formData = new FormData();
      formData.append("profileUrl", profileUrl);

      axios
        .patch(`${API_DOMAIN}/child/picture/${childId}`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          setIsEditing(false);
          fetchChildData(childId, accessToken);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    window.location.reload();

  };


  return (
    <div>
      <Header />
      <div className="profile-page">
        <div className="profile-containers">
          <div className="child-image" >
            {isEditing ? (
              <div>
                <img src={imgSrc || childData.profileUrl} alt="Profile" onClick={handleUploadClick} />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
            ) : (
              < img src={childData.profileUrl} alt="Profile" />
            )}
          </div>
          {isEditing ? (
            <input
              className="custom-input"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            <h2 className="name">{childData.name}</h2>
          )}
          <div className="details">
            <div className="detail-item">
              <span className="label">성별</span>
              <hr />
              {isEditing ? (
                <select
                  className='custom-select'
                  value={editedGender}
                  onChange={(e) => setEditedGender(e.target.value)}
                >
                  <option value="MALE">남자</option>
                  <option value="FEMALE">여자</option>
                </select>
              ) : (
                <span className="value">{childData.gender === "MALE" ? "남자" : "여자"}</span>
              )}
            </div>
            <div className="detail-item">
              <span className="label">생년월일</span>
              <hr />
              {isEditing ? (
                <DatePicker
                  selected={editedBirthday}
                  onChange={(date) => setEditedBirthday(date)}
                  dateFormat="yyyy-MM-dd"
                  className="custom-datepicker-input"
                  showPopperArrow={false}
                />
              ) : (
                <span className="value">{childData.birthday}</span>
              )}
            </div>
            <div className="detail-item">
              <span className="label">MBTI</span>
              <hr />
              <span className="value">{mbti}</span>
            </div>
          </div>
          <div className="mbti-chart" >

            {resultYn ? (
              <>
                {/* I vs E */}
                <div className="chart-item">
                  <span className="label">I ({100 - eiScore}%)</span>
                  <div className="chart-bar-container">
                    <div className="chart-bar">
                      {mbti.includes('I') ? (
                        <div className="fill-left" style={{ width: `${100 - eiScore}%` }}></div>
                      ) : (
                        <div className="fill-right" style={{ width: `${eiScore}%` }}></div>
                      )}
                    </div>
                  </div>
                  <span className="label">E ({eiScore}%)</span>
                </div>

                {/* N vs S */}
                <div className="chart-item">
                  <span className="label">N ({100 - snScore}%)</span>
                  <div className="chart-bar-container">
                    <div className="chart-bar">

                      {mbti.includes('N') ? (
                        <div className="fill-left" style={{ width: `${100 - snScore}%` }}></div>
                      ) : (
                        <div className="fill-right" style={{ width: `${snScore}%` }}></div>
                      )}
                    </div>
                  </div>
                  <span className="label">S ({snScore}%)</span>
                </div>

                {/* F vs T */}
                <div className="chart-item">
                  <span className="label">F ({100 - tfScore}%)</span>
                  <div className="chart-bar-container">
                    <div className="chart-bar">

                      {mbti.includes('F') ? (
                        <div className="fill-left" style={{ width: `${100 - tfScore}%` }}></div>
                      ) : (
                        <div className="fill-right" style={{ width: `${tfScore}%` }}></div>
                      )}
                    </div>
                  </div>
                  <span className="label">T ({tfScore}%)</span>
                </div>

                {/* P vs J */}
                <div className="chart-item">
                  <span className="label">P ({100 - jpScore}%)</span>
                  <div className="chart-bar-container">
                    <div className="chart-bar">

                      {mbti.includes('P') ? (
                        <div className="fill-left" style={{ width: `${100 - jpScore}%` }}></div>
                      ) : (
                        <div className="fill-right" style={{ width: `${jpScore}%` }}></div>
                      )}
                    </div>
                  </div>
                  <span className="label">J ({jpScore}%)</span>
                </div>

              </>
            ) : (
              <p className="no-result-message">진단 결과가 없습니다.</p>
            )}
          </div>
          <div className="buttons">
            <button className="child-edit-buttons" onClick={handleEdit}>수정</button>
            {isEditing && (
              <button className="child-confirm-buttons" onClick={handleConfirm}>확인</button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}


export default ChildDetails;
