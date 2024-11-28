import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, Search, Explore, Message, AddCircle, AccountCircle} from '@mui/icons-material';
import newLogo from '../../assets/favicon.png'; // 로컬 이미지 파일 가져오기
import SearchPaeg from './Search/Search';
import {Logout} from '../../GoogleLoginAPI/Logout';
import './Sidebar.css';
import FollowSearch from './FollowSearch/FollowSearch';
import followApi from '../../service/followApi';

//부모 div 플렉스로 만들고 영역정하기
export default function Sidebar({setIsLogin}) {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState();
  const [isSearch, setIsSearch] = useState();
  const [pageId, setPageId] =useState();
  //새로고침해도 현재패이지 유지
  useEffect(()=>{
    setPageId(localStorage.getItem("pageId"));
    if(localStorage.getItem("pageId") <= 1 || localStorage.getItem("pageId")>4){
      setIsCollapsed(false);
      setIsSearch(false);
    }else{
      setIsCollapsed(true);
      setIsSearch(false);
    }
  },[])

  const handleToggleSidebar = (check) => {
    if(check>1&&check<5){
      setIsCollapsed(true);
      setIsSearch(false);
    }else if(check<1||check>4){
      setIsCollapsed(false);
      setIsSearch(false);
    }else if(check===1 && pageId>1&& pageId<5){
      setIsSearch(!isSearch);
    }else{
      setIsSearch(!isSearch);
      setIsCollapsed(!isCollapsed);
    }
    if((check ===1 && pageId<2) || check!==1 ){
      localStorage.setItem("pageId",check);
      setPageId(check);
    }
  }

  const logouthandle=()=>{
    Logout();
    setIsLogin(false);
    navigate('/login');
  }

  const followerhandle=async(user1Id,user2Id)=>{
    await  followApi.CreateFollower({"follower":{"id":user1Id},"following":{"id":user2Id}})
    
  }

  return (
  <div className='main'>
    <div className={`sidebar ${isCollapsed ? "collapsed":""}`}>
      <div className="sidebar_container">
        <img
          src={newLogo} // 로컬 이미지 변수 사용
          alt="Baesh Logo"
          className={`sidebar_logo ${isCollapsed ? "collapsed":""}`}
        />
        <Link to="/" 
        className={`sidebar_option ${isCollapsed ? "collapsed":""}`}
        onClick={()=>{handleToggleSidebar(0)}}>
          <Home />
          {!isCollapsed && <span>홈</span>}
        </Link>

        <div 
        className={`sidebar_option ${isCollapsed ? "collapsed":""}`} 
        onClick={()=>handleToggleSidebar(1)}>
            <Search />
            {!isCollapsed && <span>검색</span>}
        </div>

        <Link to="/town" 
        className={`sidebar_option ${isCollapsed ? "collapsed":""}`}
        onClick={()=>handleToggleSidebar(2)}
        >
          <Explore />
          {!isCollapsed && <span>마을</span>}
        </Link>

        <Link to="/messages" 
        className={`sidebar_option ${isCollapsed ? "collapsed":""}`}
        onClick={()=>handleToggleSidebar(3)}
        >
          <Message />
          {!isCollapsed && <span>메시지</span>}
        </Link>

        <Link to="/upload" 
        className={`sidebar_option ${isCollapsed ? "collapsed":""}`}
        onClick={()=>handleToggleSidebar(4)}>
          <AddCircle />
          {!isCollapsed && <span>게시</span>}
        </Link>

        <Link to="/profile" 
        className={`sidebar_option ${isCollapsed ? "collapsed":""}`}
        onClick={()=>handleToggleSidebar(5)}>
          <AccountCircle />
          {!isCollapsed && <span>프로필</span>}
        </Link>
      </div>
      <diV className="sidebar_container_user">
        <img className='sidebar_container_user_img' src={"https://via.placeholder.com/75"} alt="user" />
        {!isCollapsed &&(
        <div onClick={logouthandle}>
          <span>로그아웃</span>
        </div>)}
      </diV>

    </div>
    {isSearch&&
    <div className="Search">
      <SearchPaeg followerhandle={followerhandle}/>
      <FollowSearch followerhandle={followerhandle}/>
    </div>
    }
    <div className={`content ${pageId ===2 || pageId ===3 ? "collapsed":""}`}>
      <Outlet/>
    </div>
  </div>
  );
}
