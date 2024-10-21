import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';

export default function MBTInyMain() {
    return (
        <div className="main-container">
            <Header />
            <div className="content-container">
                메인
            </div>
            <NavBar />
        </div>
    );
}
