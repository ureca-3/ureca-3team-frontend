import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';
import './style/mdata.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { API_DOMAIN } from '../../api/domain';
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';

export default function ChildMbtiData() {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState('');
    const location = useLocation();
    const { childId } = location.state || localStorage.getItem("childId");
    const [childInfo, setChildInfo] = useState(null);
    const [activeData, setActiveData] = useState([]);
    const [nonActiveData, setNonActiveData] = useState([]);
    const [confirmMsg, setConfirmMsg] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteParams, setDeleteParams] = useState({});
    const [deleteCompleted, setDeleteCompleted] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            setAccessToken(token);
            getChildData(childId, token);
            getChildMbtiData(childId, token);
        }
    }, [childId]);

    const getChildData = (childId, token) => {
        axios.get(`${API_DOMAIN}/child/${childId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            const childInfo = response.data.result;
            setChildInfo(childInfo);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    };

    const getChildMbtiData = (childId, token) => {
        axios.get(`${API_DOMAIN}/assessment/${childId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            const mbtiData = response.data.result;
            setActiveData(mbtiData.filter(item => item.status === "ACTIVE"));
            setNonActiveData(mbtiData.filter(item => item.status === "NONACTIVE"));
        })
        .catch(error => {
            console.error("Error fetching MBTI data:", error);
        });
    };

    const handleDeleteClick = (childMbtiScoreId, status) => {
        setConfirmMsg('삭제시 영구 삭제되며 복구가 불가합니다.\n삭제 하시겠습니까?');
        setDeleteParams({ childMbtiScoreId, status });
        setShowConfirm(true);
    };

    const deleteAssessment = () => {
        const { childMbtiScoreId, status } = deleteParams;
        const token = accessToken || localStorage.getItem("jwtToken");
        console.log(token);
        console.log(childMbtiScoreId);
        axios.patch(`${API_DOMAIN}/assessment/${childMbtiScoreId}`,{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(() => {
            if(status === 'ACTIVE'){
                setConfirmMsg('삭제되었습니다.\n진단 페이지로 이동합니다.');
                setDeleteCompleted(true);
            } else {
                setConfirmMsg('삭제되었습니다.');
                setDeleteCompleted(true);
            }
        })
        .catch(error => {
            console.error("Error deleting MBTI data:", error);
        });
    };

    const handleConfirmClick = () => {
        setShowConfirm(false);

        if (deleteCompleted) {
            const { status } = deleteParams;
            if (status === "ACTIVE") {
                navigate('/mbtiStart', { state: { childId: childId } });
            } else {
                getChildMbtiData(childId, accessToken);
            }
            setDeleteCompleted(false); // 상태 초기화
        }
    };

    return (
        <div>
            <Header />
            <div className="mdata-main-container">
                <div className="mdata-content-container">
                    <h3>{childInfo?.name} 님의 진단 결과</h3>

                    {/* 현재 진단 결과 */}
                    <div className="section-title">현재 진단 결과</div>
                    <div className="current-diagnostic">
                        {activeData.length > 0 ? (  
                            <> 
                        <div className="score-table">
                            <div><p>날짜</p><p>{activeData[0]?.assessmentDate || ""}</p></div>
                            <div><p>타입</p><p>{activeData[0]?.mbtiResult || "결과 없음"}</p></div>
                            <div><p>E/I</p><p>{activeData[0]?.eiScore}</p></div>
                            <div><p>S/N</p><p>{activeData[0]?.snScore}</p></div>
                            <div><p>T/F</p><p>{activeData[0]?.tfScore}</p></div>
                            <div><p>J/P</p><p>{activeData[0]?.jpScore}</p></div>
                        </div>
                        <button className="mbti-delete-button" onClick={() => handleDeleteClick(activeData[0]?.childMbtiScoreId, activeData[0]?.status)}>
                            <FaTrash size={16} />
                        </button>
                        </>
                        ) : (
                            <p>진단 내역이 없습니다.</p>
                        )}
                    </div>

                    {/* 이전 진단 내역 */}
                    <div className="section-title">이전 진단 내역</div>
                    <div className="previous-diagnostic">
                        {nonActiveData.length > 0 ? (
                            nonActiveData.map((item, index) => (
                                <div key={index} className="previous-diagnostic-item">
                                    <div className="score-table">
                                        <div><p>날짜</p><p>{item.assessmentDate}</p></div>
                                        <div><p>타입</p><p>{item.mbtiResult || "결과 없음"}</p></div>
                                        <div><p>E/I</p><p>{item.eiScore}</p></div>
                                        <div><p>S/N</p><p>{item.snScore}</p></div>
                                        <div><p>T/F</p><p>{item.tfScore}</p></div>
                                        <div><p>J/P</p><p>{item.jpScore}</p></div>
                                    </div>
                                    <button className="mbti-delete-button" onClick={() => handleDeleteClick(item.childMbtiScoreId, item.status)}>
                                        <FaTrash size={16} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>진단 내역이 없습니다.</p>
                        )}
                    </div>
                    <div className="mbti_info_text">
                        * 수치가 50% 이상일수록 외향적(E), 현실적(S), 논리적(T), 계획적(J) 성향이 높습니다.
                    </div>
                </div>
                
                {/* 커스텀 컨펌 창 */}
                {showConfirm && (
                    <div className="confirm-overlay">
                        <div className="confirm-container">
                            <p style={{ whiteSpace: 'pre-line' }}>{confirmMsg}</p>
                            <button onClick={deleteCompleted ? handleConfirmClick : deleteAssessment} className="confirm-button">확인</button>
                            <button onClick={() => setShowConfirm(false)} className="cancel-button">취소</button>
                        </div>
                    </div>
                )}
            </div>
            <NavBar />
        </div>
    );
}
