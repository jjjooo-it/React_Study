import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function Header() {
  return (
    <header className="headerSignup">
        <div className='headerleft'>
            <p><strong>🦁JOBLION </strong></p>
        </div>
      <Link to="/">
        <p>홈페이지</p>
      </Link>
    </header>
  );
}

function Body() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: name,
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        alert('가입 성공!');
      } else {
        alert('가입 실패.');
      }
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return (
    <header className="body">
      <div className='comName'>
        <p>🦁JOBLION X LIKELION🦁</p>
      </div>
      <div className='login'>
        <div className='signupContainer'>
          <form onSubmit={handleSubmit}>
            <p className='pageName'>Sign up</p>
            <p>이름</p>
            <div className="inputCom">
              <input
                type="text"
                className="nameID"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <p>아이디</p>
            <div className="inputCom">
              <input
                type="text"
                className="ID"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <p>비밀번호</p>
            <div className="inputCom">
              <input
                type="password"
                className="PW"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <p></p>
            <input
              type="submit"
              value="가입하기"
              className="signupBTN"
            />
          </form>
        </div>
      </div>
    </header>
  );
}

function Lower() {
  return (
    <lower className="lower">
      <div className='lower'>
        <p>고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이 사자처럼(주)</p>
      </div>
    </lower>
  );
}

function Signup() {
  return (
    <div className='container'>
      <Header />
      <Body />
      <Lower />
    </div>
  );
}

export default Signup;
