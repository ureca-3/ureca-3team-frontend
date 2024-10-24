import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MBTInyMain from './views/MBITny';
import MyPage from './views/Mypage';
import Histogram from './views/Histogram';
import Assessment from './views/Assessment';
import SignIn from './views/SignIn';
import AdminMain from './views/Admin/AdminMain';
import AdminContents from './views/Admin/AdminContents';
import AdminUpload from './views/Admin/AdminUpload';
import AdminEdit from './views/Admin/AdminEdit';

function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MBTInyMain />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/histogram" element={<Histogram />} />
        <Route path="/mbti" element={<Assessment />}> </Route>
        <Route path='/sign' element={<SignIn />}></Route>
        <Route path='/admin' element={<AdminMain/>}></Route>
        <Route path='/adminContents' element={<AdminContents />}></Route>
        <Route path='/adminUpload' element={<AdminUpload />}></Route>
        <Route path='/adminEdit' element={<AdminEdit />}></Route>
      </Routes>
    </BrowserRouter>
);
}


export default App;
