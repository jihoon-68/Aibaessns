import { useEffect, useState } from 'react';
import './FollowSearch.css';
import followApi from '../../../service/followApi';
import getUserInfo from '../../../GoogleLoginAPI/getUserInfo';
import { Button } from '@mui/material';
const FollowSearch=({followerhandle})=>{
    const [follows , setFollows] = useState([]);
    const [userId,setUserId] =useState();
    useEffect(()=>{
        const getFollow =async()=>{
            const user = await getUserInfo();
            const getFollowList= await followApi.followList(user.user.id);
            setUserId(user);
            setFollows(getFollowList.followerList);
        }
        getFollow();
    },[])

    return(
        <div className="search-follower">
            <div className="search-title">
                <h2>팔로우</h2>
            </div>
            {follows.map((follow)=>(
              <div key={follow.id} className="search-result">
                <img src={follow.pictureUrl} className="avatar"/>
                <div className="user-details">
                  <span className="name">{follow.name}</span>
                  <span className="username">@{follow.email}</span>
                </div>
                <Button onClick={()=>{followerhandle(follow.id,userId.user.id)}}>팔로우</Button>
              </div>
            ))}

        </div>
    )
}
export default FollowSearch;