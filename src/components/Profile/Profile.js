import React, { useEffect, useState } from "react";
import "./Profile.css";
import FollowPopup from "../Follow/FollowPopup/FollowPopup";
import ProfileFeed from "./ProfileFeed/ProfileFeed";
import ProfileFeedPopup from "./ProfileFeedPopup/ProfileFeedPopup";
import postApi from "../../service/postApi";
import getUserInfo from "../../GoogleLoginAPI/getUserInfo";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [followPopupContent, setFollowPopupContent] = useState(null);
  const [feedPopupContent,setFeedPopupContent] =useState(null);
  const [isfollowPopupVisible, setIsFollowPopupVisible] = useState(false);
  const [isFeedPopupVisible, setIsFeedPopupVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [feeds,setFeeds] =useState([])
  
  const [user,setUser] =useState()
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    
    const getUserPost=async()=>{
      try{
        //유저 정보 불러옴
        const user = await getUserInfo();

        //유저 게시물 유저 고유번호로 조회
        const posts = await postApi.userGetAllPosts(user.user.id);
        setFeeds(posts);
        setUser(user);
        setLoading(false);
      }catch (e){
        console.error("Error loading Profile:", e);
        setLoading(false);
      }
    }
    const timer = setInterval(() => {
      getUserPost();
    }, 10000);// 1초마다 업데이트
    getUserPost();
    return () => clearInterval(timer);
  }, []);

  const handlePopupOpen = (ContentType,type) => {
    if(!type){
        console.log(ContentType);
        setFollowPopupContent(ContentType); // 팝업에 표시할 콘텐츠 설정
        setIsFollowPopupVisible(true); // 팝업 표시
    }else{
        setFeedPopupContent(ContentType);
        setIsFeedPopupVisible(true);
    }
  };

  const handlePopupClose = (type) => {
    if(!type){
        setIsFollowPopupVisible(false); // 팝업 숨기기
    }else{
        setIsFeedPopupVisible(false);
    }
  };

  //로딩페이지 표시
  if (loading) {
    return (
      <div className="loading-modal">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* 프로필 정보 */}
      <div className="profile-header">
        <div className="profile-picture">
          <img
            src={user.user.pictureUrl}
            alt="User Profile"
            className="profile-img"
          />
        </div>
        <div className="profile-details">
          <div className="profile-name">
            <h2>{user.user.email}</h2>
            <button>프로필 편집</button>
          </div>
          <div className="profile-stats">
            <span>게시물 {feeds.length}</span>
            <span onClick={() => handlePopupOpen(1,0)} className="clickable">
              팔로워 {user.user.followers}
            </span>
            <span onClick={() => handlePopupOpen(0,0)} className="clickable">
              팔로우 {user.user.following}
            </span>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="profile-tabs">
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => handleTabClick("posts")}
        >
          게시물
        </button>
        <button
          className={activeTab === "saved" ? "active" : ""}
          onClick={() => handleTabClick("saved")}
        >
          저장됨
        </button>
        <button
          className={activeTab === "tagged" ? "active" : ""}
          onClick={() => handleTabClick("tagged")}
        >
          태그됨
        </button>
      </div>
      <hr style={{marginBottom:"10px",marginTop:"0"}}/>
      {/* 콘텐츠 영역 */}
      <div className="profile-content">
        {activeTab === "posts"&&(
          feeds.map((feed)=>(
            <ProfileFeed 
            feedLength={feeds.length} 
            handlePopupOpen={handlePopupOpen}
            feedId={feed.id}
            postImageUrl={feed.imageUrl}
            />
          ))
        )}

        {activeTab === "saved" && (
          <div className="saved-tab">
            <p>저장한 게시물이 없습니다.</p>
          </div>
        )}
        {activeTab === "tagged" && (
          <div className="tagged-tab">
            <p>태그된 게시물이 없습니다.</p>
          </div>
        )}
      </div>

      {/* 팔로우 팝업 영역 */}
      {isfollowPopupVisible && (
            <FollowPopup type={followPopupContent ? 1 : 0} handlePopupClose={handlePopupClose} userId={user.user.id}/>
        )}
      {/* 피드영역 팜업 영역 */}
      {isFeedPopupVisible &&(
        <ProfileFeedPopup Profile={feeds.find((feed)=>{ return feed.id == feedPopupContent })} handlePopupClose={handlePopupClose}/>
      )}
    </div>
  );
};

export default Profile;