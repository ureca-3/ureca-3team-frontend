import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';

export default function MBTInyMain() {
    return (
        <div className="main-container">
            <div className="content-container">
                <h1 className="mbtiny-title">MBTIny</h1>
                <p className="mbtiny-subtitle">
                    우리 아이 성격에 딱 맞는 책,<br/> MBTI로 찾아드려요!
                </p>
                
                <a href="" className="kakao-button">
                    <img src="/img/kakao_login_medium_narrow.png" alt="Login with Kakao" />
                </a>
            </div>
            <NavBar />
        </div>
    );
}
