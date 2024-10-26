import { Link } from "react-router-dom";
import './NavBar.css';

export default function NavBar() {
    return (
        <footer className="navbar" >
            <nav>
                {/* <ul className="navbar-list">
                        <li><Link to="/histogram">히스토그램</Link></li>
                        <li><Link to="/">메인</Link></li>
                        <li><Link to="/mypage">마이페이지</Link></li>
                    </ul> */}
            </nav>
            <div className="footer-info">
                <p>&copy; {new Date().getFullYear()} MBTIny. All rights reserved.</p>
                <p>주소: 서울 강남구 선릉로 428, 403호 </p>
            </div>
        </footer>
    );
}