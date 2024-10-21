import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';

export default function Assessment() {
    return (
        <div className="main-container">
            <Header />
            <div className="content-container">
                진단 평가
            </div>
            <NavBar />
        </div>
    );
}