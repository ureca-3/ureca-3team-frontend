import React, { useState } from 'react';
import './styles.css';
import Header from '../../components/Header';

const editContent =() => {
  console.log("수정 버튼");
}

const deleteContent = () => {
  console.log("삭제 버튼");
}

// const [message, setMessage] = useState("");
// const handlePopupMessage = () => {
//   setM
// }

const AdminContents = () => {
  return (
    <div> 
        <Header></Header>
        <div className='main-container'>
        <div className="book-detail-container">
        <div className="book-image">
            <img src="https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791170441588.jpg" alt="책 이미지" />
        </div>

        <div className="book-info">
            <h2 className="book-title">질문하는 아이</h2>
            <p className="book-author">소원나무<br />박종진 지음</p>

            <p className="book-description">
            만약 바람이 불어 어깨에 은행잎이 떨어진다면 우리는 떨어진 은행잎을 보고 어떤 생각을 할까요? 평범한 사람이라면 가을에 은행잎이 떨어지는 것을 당연한 일이라고 생각하지만 아닐지도 모릅니다. 하지만 여기 모든 게 평범하지 않은 아이가 있습니다. 주위에서 일어나는 모든 일이 궁금한 '질문하는 아이'는 아마 은행잎이 자신에게 말을 걸 거 아닐까, 고민하고 있을지 모른답니다.
            </p>
            <p className="book-description">
            《질문하는 아이》 속 호기심 많은 아이는 엄마와 길을 나서면서 다양한 질문을 합니다. 구름은 왜 하얗기만 한지, 은행잎이 왜 떨어지는지, 사촌동이는 왜 사람과 그렇게 있는지, 명소에 왜 전설들이 빠짐없이 나와 있는지. 우리가 당연하게 생각하는 모든 것이 아이에게는 신기하기만 합니다. 이야기를 술술 읽어나가다 보면 이 아이의 질문은 들으면 들을수록 세상 모든 것이 새롭게 보일 거예요! 《질문하는 아이》를 통해 우리 모두 즐거운 질문이 가득한 상상의 세계로 빠져 보아요.
            </p>

            <span className="mbti">ESFJ</span>

            <div className="book-actions">
            <button className="edit-button" onClick={editContent}>수정</button>
            <button className="delete-button" onClick={deleteContent}>삭제</button>
            </div>
        </div>
        </div>
        </div>
    </div>
  );
};

export default AdminContents;
