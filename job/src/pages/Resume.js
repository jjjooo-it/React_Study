import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Resume.css';

function Header() {
  return (
    <header className="headerRe">
      <div className="headerLeft">
        <p>
          <strong>🦁JOBLION </strong>자소서 작성하기
        </p>
      </div>
      <Link to="/">
        <p>홈페이지</p>
      </Link>
      <div></div>
    </header>
  );
}

function Body() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentLength, setContentLength] = useState(0);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    const content = event.target.value;
    if (content.length <= 1000) {
      setContent(content);
      setContentLength(content.length);
    }
  };

  const handleSubmit = () => {
    const data = {
      title: title,
      content: content,
    };

    fetch('http://localhost:8080/resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <header className="body2">
      <div className="resumeBody">
        <div className="resumeTit">
          <form>
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={handleTitleChange}
            />
          </form>
        </div>
        <div className="resumeCon">
          <form>
            <textarea
              placeholder="해당 내용을 입력하세요"
              value={content}
              onChange={handleContentChange}
            />
          </form>
        </div>
        <div className="counter">
          글자 수: {contentLength}/1000 | 공백포함
        </div>
        <div className="resumedd">
          <form>
            <input type="button" value="저장" onClick={handleSubmit} />
          </form>
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
          고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이
          사자처럼(주)
        </p>
      </div>
    </lower>
  );
}

function Resume() {
  return (
    <div className="container">
      <Header />
      <Body />
      <Lower />
    </div>
  );
}

export default Resume;
