import NavBar from "../../components/NavBar";
import '../Page.css';
import {API_DOMAIN} from '../../api/domain';

export default function SignIn() {

    const SignInButton = (event) => {
        event.preventDefault();
        window.location.href = `${API_DOMAIN}/auth/kakao`;
    }

    return (
        <div className="main-container">
                <div style={{flexDirection : 'column'}}>
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
        </div>
    );
}
