import React, { useEffect, useState } from "react";
import FollowUser from "../FollowUser/FollowUser";
import getUserInfo from "../../../GoogleLoginAPI/getUserInfo";
import "./FollowPopup.css";
import followApi from "../../../service/followApi";

export default function FollowPopup({type,handlePopupClose,userId}){
  
  const [follow , setFollow] = useState([]);
  const [follower , setFollower] = useState([]);

  useEffect(()=>{
    const getFollows = async()=>{
      const getFollow = await followApi.followList(userId);
      setFollower(getFollow.followerList)
      setFollow(getFollow.followingList)
    }
    const timer = setInterval(() => {
      getFollows();
    }, 1000);// 1초마다 업데이트
    getFollows();
    return () => clearInterval(timer);
  },[])

  const deleteFollow=(type,follower,following)=>{
    if(type === "팔로워"){
      followApi.deleteFollower({"follower":{"id":follower} ,"following":{"id":following}});
      setFollow((follow) => follow.filter((item) => item.id !== follower))
    }
  }


    return(
        <div className="popup-overlay" onClick={()=>{handlePopupClose(0)}}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>{type ? "팔로워" : "팔로우"}</h3>
              <button className="close-button" onClick={()=>{handlePopupClose(0)}}>
                ✕
              </button>
            </div>
            <div className="popup-content">
              {(type ? follow : follower).map((user)=>(
                  <FollowUser
                    followId={user.id}
                    userId ={userId}
                    type={type === "followers" ? "팔로워" : "팔로우"}
                    userName={user.email}
                    postProfileUrl={user.pictureUrl}
                    deleteFollow ={deleteFollow}
                  />
              ))}
            </div>
          </div>
        </div>
    )
}