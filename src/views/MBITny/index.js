import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';
import SignIn from "../SignIn";
import axios from 'axios';

export default function MBTInyMain() {

    const SignInButton = (event) => {
        event.preventDefault();
        window.location.href = "http://localhost:8080/api/v1/auth/kakao";

        // axios.get("http://localhost:8080/api/v1/auth/kakao")
        //     .then(response => {
        //         // 카카오 로그인 리디렉션 또는 다른 처리
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error during Kakao login:', error);
        //     });
    }

    return (
        <div className="main-container">
                <h1 className="mbtiny-title">MBTIny</h1>
                <img src="/img/book.png" className="book-img" alt="mainBook" />
                <p className="mbtiny-subtitle">
                    우리 아이 성격에 딱 맞는 책,<br/> MBTI로 찾아드려요!
                </p>
                <a href="" className="kakao-button" onClick={SignInButton}> 
                    <img src="/img/kakao_login_medium_narrow.png" alt="Login with Kakao" />
                </a>
            <NavBar />
        </div>
    );
}
