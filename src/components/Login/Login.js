import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin/GoogleLogin";
import {postLoginToken} from "../../GoogleLoginAPI/postLoginToken";
import './Login.css';
const Login=({isLogin, setIsLogin})=>{
  const navigate = useNavigate();
  const onGoogleSignIn = async res => {
    const { credential } = res;
    const result = await postLoginToken(credential, setIsLogin);
    setIsLogin(result);
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  return(
    <div className="login-container">
      <h1 className="login-title">Google 로그인</h1>
      <div className="google-login-wrapper">
        <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" />
      </div>
    </div>
  )
}

export default Login;