import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Header() {
  return (
    <header className="headerLogin">
      <div className="headerleft">
        <p>
          <strong>🦁JOBLION </strong>
        </p>
      </div>
      <Link to="/">
        <p>홈페이지</p>
      </Link>
    </header>
  );
}

function Body() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('경고! 아이디와 비밀번호를 입력하세요.');
      return;
    }

    const loginData = { username, password };

    try {
      const response = await fetch('http://localhost:8080', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        alert('로그인 성공!');
        // Redirect to the home page after successful login
        navigate('/');
      } else {
        console.error('Login failed');
        alert('로그인 실패! 아이디 또는 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('로그인 실패! 서버와의 연결에 문제가 있습니다.');
    }
  };

  return (
    <header className="body">
      <div className="comName">
        <p>🦁JOBLION X LIKELION🦁</p>
      </div>
      <div className="login">
        <div className="logContainer">
          <div className="guide">
            <p className="p1">Login</p>
            <p className="p2">가입하신 아이디와 비밀번호를 입력해주세요.</p>
          </div>
          <div className="idANDpw">
            <form>
              <div className="inputGroup">
                <input
                  type="text"
                  placeholder="아이디"
                  className="loginID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="inputGroup">
                <input
                  type="password"
                  placeholder="비밀번호"
                  className="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="inputGroup">
                <input
                  type="button"
                  value="로그인"
                  className="loginBTN"
                  onClick={handleLogin}
                />
              </div>
            </form>
            <p>좋은 일을 찾으시나요? 회원가입하시고 다양한 혜택을 누리세요!</p>
            <Link to="/signup">
              <form>
                <input type="button" value="회원가입" className="signupBTN" />
              </form>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Lower() {
  return (
    <lower className="lower">
      <div className="lower">
        <p>
          고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교
          멋쟁이 사자처럼(주)
        </p>
      </div>
    </lower>
  );
}

function Login() {
  return (
    <div className="container">
      <Header />
      <Body />
      <Lower />
    </div>
  );
}

export default Login;
