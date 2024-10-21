import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import '../Page.css';

export default function Histogram() {
    return (
        <div className="main-container">
            <Header />
            <div className="content-container">
                히스토그램
            </div>
            <NavBar />
        </div>
    );
}