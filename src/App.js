import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MBTInyMain from './views/MBITny';
import MyPage from './views/Mypage';
import Histogram from './views/Histogram';
import Assessment from './views/Assessment';
import SignIn from './views/SignIn';

function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MBTInyMain />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/histogram" element={<Histogram />} />
        <Route path="/mbti" element={<Assessment />}> </Route>
        <Route path='/sign' element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
);
}


export default App;
