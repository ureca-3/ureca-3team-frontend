import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';

export default function SignIn() {
    return (
        <div className="main-container">
            <Header />
            <div className="content-container">
                로그인
            </div>
            <NavBar />
        </div>
    );
}