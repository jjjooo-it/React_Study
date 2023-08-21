import React, { useState } from 'react';
import './styles/Login.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../AuthContext';

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // 무조건 로그인 성공 설정
    const data = {
      status: 200,
      userId: 1,
      tokenDto: {
        accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjkxMjE5OTM5LCJleHAiOjU0MjM2OTk5Mzl9.zv8Dkr7MHN4MMuh3g5ONSlDK6rzhGTnS9p4G0g1hTJc"
      }
    };
    console.log('Login response:', data);
    if (data.status === 200) {
      console.log('Login response:', data);

      // Set the received token and userId to the Auth context
      setAuth({
        userId:1,
        token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjkxMjE5OTM5LCJleHAiOjU0MjM2OTk5Mzl9.zv8Dkr7MHN4MMuh3g5ONSlDK6rzhGTnS9p4G0g1hTJc"
      });

      // Navigate to the next page with the received userId and token
      navigate('/farm', {
        state: {
          userId:1,
        token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjkxMjE5OTM5LCJleHAiOjU0MjM2OTk5Mzl9.zv8Dkr7MHN4MMuh3g5ONSlDK6rzhGTnS9p4G0g1hTJc"
     
        }
      });
      alert("로그인 성공!");
    } else {
      setError(data.message || '로그인에 실패했습니다.');
      alert(data.message);
    }
  };

  return (
    <div className="Login">
      <Header />
      <div className='container'>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item'></div>
        <div className='loginContainer'>
          <div className='item_groupedBox'>
            <p className='LoginName'>Log in</p>
            <p className='side'>가입하신 아이디와 비밀번호를 입력해주세요.</p>
            <p>아이디</p>
            <div className="inputCom">
              <input
                type="text"
                className="userID"
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <p>비밀번호</p>
            <div className="inputCom">
              <input
                type="password"
                className="userPW"
                onChange={(e) => setPw(e.target.value)}
              />
            </div>
            <p></p>
            <input
              type="submit"
              value="로그인"
              className="loginBTN"
              onClick={handleLogin}
            />
          </div>
          <div className='signupContainer'>
            <p className='SignupName'>Sign up</p>
            <p>지금 Like Farmer의 회원이 되어보세요.</p>
            <input
              type="submit"
              value="회원가입"
              className="signupBTN"
              onClick={()=>{navigate('/signup')}}
            />
          </div>
          <div className='gog'>
            <p className='SignupName'>Announcement</p>
            <p>공지사항을 통해 더 많은 정보를 얻어보세요.</p>
            <input
              type="submit"
              value="공지사항"
              className="signupBTN"
            />
          </div>
        </div>
      </div>
      <div className="lower">
        <div className='lower'>
          <p>고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이 사자처럼(주)</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
