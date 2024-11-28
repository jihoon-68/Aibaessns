import React from 'react';
import './Post.css';

export default function Post({ userName, caption, postImageUrl,postProfileUrl }) {
  return (
    <div className="post">
      <div className="post_header">
        <img className="post_profile" src={postProfileUrl} alt="profile"/>
        <h3>{userName}</h3>
      </div>
      <img className="post_image" src={postImageUrl} alt="Post" />
      <h4 className="post_caption">
        <strong>{userName}</strong> {caption}
      </h4>
    </div>
  );
}
