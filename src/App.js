import './App.css';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Sidebar from "./components/Sidebar/Sidebar";
import Gathertown from "./components/Gathertown/Home"
import Feed from './components/Feed/Feed';
import Profile from './components/Profile/Profile';
import ChatRoom from './components/ChatRoom/ChatRoom';
import Login from './components/Login/Login';
import { useEffect, useState } from 'react';
import getUserInfo from './GoogleLoginAPI/getUserInfo';
function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const initLogin = async () => {
      const name = await getUserInfo();
      setIsLogin(!!name);
      if(!isLogin){
        <Navigate to='/login'/>
      }
    };
    initLogin();
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Sidebar setIsLogin={setIsLogin}/>}>
          <Route index element={<Feed/>}/>
          <Route path='/town' element={<Gathertown/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/messages' element={<ChatRoom/>}/>
        </Route>
        <Route path='/login' element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
