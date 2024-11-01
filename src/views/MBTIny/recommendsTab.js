import '../Page.css';
import './style/recommends.css';
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

/** 메인 페이지 로그인 시 토큰 받아오기 */
export default function RecommendsTab({ firstRecommd, secondRecommd, thirdRecommd }) {
    const navigate = useNavigate();

    const firstScrollRef = useRef(null);
    const secondScrollRef = useRef(null);
    const thirdScrollRef = useRef(null);

    useEffect(() => {
        // 첫번째 목록 스크롤 이벤트
        const handleFirstScroll = (event) => {
            if (firstScrollRef.current) {
                event.preventDefault();
                firstScrollRef.current.scrollBy({ left: event.deltaY * 1.5, behavior: "smooth" });
            }
        };

        // 두번째 목록 스크롤 이벤트
        const handleSecondScroll = (event) => {
            if (secondScrollRef.current) {
                event.preventDefault();
                secondScrollRef.current.scrollBy({ left: event.deltaY * 1.5, behavior: "smooth" });
            }
        };

        // 세번째 목록 스크롤 이벤트
        const handleThirdScroll = (event) => {
            if (thirdScrollRef.current) {
                event.preventDefault();
                thirdScrollRef.current.scrollBy({ left: event.deltaY * 1.5, behavior: "smooth" });
            }
        };

        // 이벤트 리스너 추가
        const firstRefCurrent = firstScrollRef.current;
        const secondRefCurrent = secondScrollRef.current;
        const thirdRefCurrent = thirdScrollRef.current;

        if (firstRefCurrent) firstRefCurrent.addEventListener("wheel", handleFirstScroll);
        if (secondRefCurrent) secondRefCurrent.addEventListener("wheel", handleSecondScroll);
        if (thirdRefCurrent) thirdRefCurrent.addEventListener("wheel", handleThirdScroll);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            if (firstRefCurrent) firstRefCurrent.removeEventListener("wheel", handleFirstScroll);
            if (secondRefCurrent) secondRefCurrent.removeEventListener("wheel", handleSecondScroll);
            if (thirdRefCurrent) thirdRefCurrent.removeEventListener("wheel", handleThirdScroll);
        };
    }, []);

    return (
        <div className="recommd-container">
            <div className="recommd-main-container">
                <div className="recommd-content-container">
                    <div className="recommended-books friends">
                        <h3>우리 아이와 비슷한 성향의 친구들이 추천한 도서</h3>
                        <p>- 자녀의 연령, 성별, MBTI 정보를 바탕으로 맞춤형 도서를 추천합니다.</p>
                        <div className="book-container" ref={thirdScrollRef}>
                            {thirdRecommd.map((book, index) => (
                                <div className="book-item" key={index} oonClick={() => navigate(`/contentsDetail/${book.bookId}`, { state: { originTab: 'recommends' } })}>
                                    <img src={book.profileUrl || "../img/avatar.png"} alt={book.title} className="book-cover" />
                                    <p className="book-title" title={book.title}>{book.title || "제목 없음"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {firstRecommd.length > 0 && (
                <div className="recommd-main-container">
                    <div className="recommd-content-container">
                        <div className="recommended-books latest">
                            <h3>최근 좋아요 누른 도서</h3>
                            <p>- 최근 좋아요 누른 도서 콘텐츠 목록입니다.</p>
                            <div className="book-container" ref={firstScrollRef}>
                                {firstRecommd.map((book, index) => (
                                    <div
                                        className="book-item"
                                        key={index}
                                        onClick={() => navigate(`/contentsDetail/${book.contentId}`, { state: { originTab: 'recommends' } })}
                                    >
                                        <img src={book.profileUrl || "../img/avatar.png"} alt={book.title} className="book-cover" />
                                        <p className="book-title" title={book.title}>{book.title || "제목 없음"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {secondRecommd.length > 0 && (
                <div className="recommd-main-container">
                    <div className="recommd-content-container">
                        <div className="recommended-books similar">
                            <h3>우리 아이가 좋아한 도서와 유사한 도서</h3>
                            <p>- 연령, 성별, 성향을 기반하여 맞춤형 도서를 추천합니다.</p>
                            <div className="book-container" ref={secondScrollRef}>
                                {secondRecommd.map((book, index) => (
                                    <div
                                        className="book-item"
                                        key={index}
                                        onClick={() => navigate(`/contentsDetail/${book.bookId}`, { state: { originTab: 'recommends' } })}
                                    >
                                        <img src={book.profileUrl || "../img/avatar.png"} alt={book.title} className="book-cover" />
                                        <p className="book-title" title={book.title}>{book.title || "제목 없음"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}
