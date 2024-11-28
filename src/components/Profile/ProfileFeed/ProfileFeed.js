import React, { useState } from "react";
import "./ProfileFeed.css"

export default function ProfileFeed({feedLength,handlePopupOpen,feedId,postImageUrl}){
    
    if(feedLength == 0){
        return(
          <div className="posts-tab">
            <p>사진을 공유하면 회원님의 프로필에 표시됩니다.</p>
            <button className="share-button">첫 사진 공유하기</button>
          </div>
        )
    }
    return(
        <div className="Profilfeed" onClick={()=>{handlePopupOpen(feedId,1)}}>
            <img src={postImageUrl} alt="feed"/>
        </div>
    )
}