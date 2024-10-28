import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MBTInyMain from './views/MBITny';
import MyPage from './views/Mypage';
import History from './views/History/history';
import Child from './views/Child/register';
import Assessment from './views/Assessment/mbtiStart';
import MbtiQuestion from './views/Assessment/mbtiQuestion';
import MbtiResult from './views/Assessment/mbtiResult';
import SignIn from './views/SignIn';

function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MBTInyMain />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/register" element={<Child />} />
        <Route path="/mbtiHistory" element={<History />} />
        <Route path="/mbtiStart" element={<Assessment />} /> 
        <Route path="/mbtiQuestion" element={<MbtiQuestion />} />
        <Route path="/mbtiResult" element={<MbtiResult />} />
        <Route path='/sign' element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
);
}


export default App;
