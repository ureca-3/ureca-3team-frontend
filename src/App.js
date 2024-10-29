import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MBTInyMain from './views/MBITny';
import MyPage from './views/Mypage';
import History from './views/History/history';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/** 메인페이지 */}
        <Route path="/" element={<MBTInyMain />} />
        
        {/** 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/:child" element={<ChildDetails />} />

        {/** 자녀 등록 */}
        <Route path="/register" element={<Child />} />

        {/** 진단 */}
        <Route path="/mbtiStart" element={<Assessment />} /> 
        <Route path="/mbtiQuestion" element={<MbtiQuestion />} />
        <Route path="/mbtiResult" element={<MbtiResult />} />

        {/** 히스토리 */}
        <Route path="/mbtiHistory" element={<History />} />

        {/** 로그인 */}
        <Route path='/sign' element={<SignIn />}></Route>

        {/** 콘텐츠 상세 */} 
        <Route path='/:content' element={<ContentsDetail />} />

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
