import React from "react";
import "./ProfileFeedPopup.css";

export default function ProfileFeedPopup({Profile,handlePopupClose}){
    
    
    return(        
      <div className="feed-popup-overlay" onClick={()=>{handlePopupClose(1)}}>
        <div className="feed-popup " onClick={(e) => e.stopPropagation()}>
          <div className="feed-popup-header">
            <button className="close-button" onClick={()=>{handlePopupClose(1)}}>
              ✕
            </button>
          </div>
          <div className="feed-popup-content">
            <img src={Profile.imageUrl}/>
            <div className="feed-side-popup-content">   
              <div className="user-feed-popup-content">
                <img src={Profile.userDTO.pictureUrl} className="img-feed-popup-content"/>
                <p>{Profile.userDTO.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}