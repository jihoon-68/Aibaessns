import React, { useEffect, useState } from "react";
import "./Search.css";
import userList from "../../../service/userList";
import getUserInfo from "../../../GoogleLoginAPI/getUserInfo";
import { Button } from "@mui/material";


const Search = ({followerhandle}) => {
  // 더미 사용자 데이터
  const [users,setUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [userInfo,setUserInfo]=useState([]);

  useEffect(()=>{
    const getUser=async()=>{
      //유저 정보 불러옴
      const userId = await getUserInfo();
      //모든 유저 불러옴
      const getAlluserList = await userList.getAllUser();

      //본인 제외
      const filteredUsers = getAlluserList.filter((user) => user.id != userId.user.id)
      setUser(filteredUsers);
      setUserInfo(userId);
    }
    getUser();
  },[])



  // 검색 필터링 로직
  const filteredUsers = users.filter((user) =>
    user.name.includes(searchQuery) || user.email.includes(searchQuery)
  );

  return (
    <div className="search-container">
      {/* 검색 입력창 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // 검색어 업데이트
        />
      </div>

      {/* 검색 결과 */}
      <div className="search-results">
        {filteredUsers.length > 0 && searchQuery ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="search-result">
              <img src={user.pictureUrl} className="avatar"/>
              <div className="user-details">
                <span className="name">{user.name}</span>
                <span className="username">@{user.email}</span>
              </div>
              <Button onClick={()=>{followerhandle(user.id,userInfo.user.id)}}>팔로우</Button>
            </div>
          ))
        ) : (
          <p className="no-results">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
