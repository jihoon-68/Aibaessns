import React from 'react';
import "./FollowUser.css"
export default function FollowUser({userId,followId,userName,postProfileUrl,type,deleteFollow}){
    return(
        <div className="follow">
            <div className="follow">
                <img className="followImg" src={postProfileUrl} alt="user"/>
                <p>{userName}</p>
            </div>
            <button onClick={()=>{deleteFollow(type,userId,followId)}}>{type}중</button>
        </div>
    )
}