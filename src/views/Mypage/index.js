import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';

export default function MyPage() {
    return (
        <div className="main-container">
            <Header />
            <div className="content-container">
                마이페이지
            </div>
            <NavBar />
        </div>
    );
}