/** @format */

import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import postApi from '../../service/postApi';
import getUserInfo from '../../GoogleLoginAPI/getUserInfo';
import './Feed.css';

export default function Feed(){
  //모든 게시글 요청
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    const getAllPost = async() =>{
      const posts = await postApi.getAllPosts();
      setPosts(posts);
      console.log(posts);
    }
    const timer = setInterval(() => {
      getAllPost();
    }, 10000); // 1초마다 업데이트
    getAllPost();
    return () => clearInterval(timer);
  },[])

  return (
    <div className="feed">
      {posts.map((post) => (
        <Post
          key={post.id}
          userName={post.userDTO.name}
          caption={post.content}
          postImageUrl={post.imageUrl}
          postProfileUrl={post.userDTO.pictureUrl}
        />
      ))}
    </div>
  );
}
