import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import RecommendsTab from './views/MBTIny/recommendsTab';
import Main from './views/MBTIny/main';
import ContentsTab from './views/MBTIny/contentsTab';
import MyPage from './views/Mypage';
import History from './views/History/history';
import Mdata from './views/MbtiData/mbtiData';
import Child from './views/Child/register';
import Assessment from './views/Assessment/mbtiStart';
import MbtiQuestion from './views/Assessment/mbtiQuestion';
import MbtiResult from './views/Assessment/mbtiResult';
import SignIn from './views/SignIn';
import ChildDetails from './views/Mypage/ChildDetails';
import AdminMain from './views/Admin/AdminMain';
import AdminContents from './views/Admin/AdminContents';
import AdminUpload from './views/Admin/AdminUpload';
import AdminEdit from './views/Admin/AdminEdit';
import ContentsDetail from './views/Contents/ContentsDetail';
import FetchUserData from './Auth/FetchUserData';
import ContentsSearch from './views/Contents/ContentsSearch';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/** 메인페이지 */}
        <Route path="/main" element={<Main />} />
        
        {/** 메인(추천)페이지 */}
        <Route path="/recommendsTab" element={<RecommendsTab />} />

        {/** 메인(콘텐츠)페이지 */}
        <Route path="/contentsTab" element={<ContentsTab />} />

        {/** 로그인 */}
        <Route path="/" element={<FetchUserData />} />
        
        {/** 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/childpage" element={<ChildDetails />} />

        {/** 자녀 등록 */}
        <Route path="/register" element={<Child />} />

        {/** 진단 */}
        <Route path="/mbtiStart" element={<Assessment />} /> 
        <Route path="/mbtiQuestion" element={<MbtiQuestion />} />
        <Route path="/mbtiResult" element={<MbtiResult />} />

        {/** 히스토리 */}
        <Route path="/mbtiHistory" element={<History />} />

        {/** 진단데이터 내역 */}
        <Route path="/mbtiData" element={<Mdata />} />

        {/** 로그인 */}
        <Route path='/sign' element={<SignIn />}></Route>

        {/** 콘텐츠 상세 */} 
        <Route path='/contentsDetail/:content' element={<ContentsDetail />} />

        {/** 콘텐츠 검색 */}
        <Route path='/search' element={<ContentsSearch />} />

        {/** 관리자 페이지 */}
        <Route path='/admin' element={<AdminMain />} />
        <Route path='/adminContents/:content' element={<AdminContents />} />
        <Route path='/adminUpload' element={<AdminUpload />} />
        <Route path='/adminEdit/:content' element={<AdminEdit />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
