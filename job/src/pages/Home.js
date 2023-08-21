import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [jobPosts, setJobPosts] = useState([]);
  const [searchJob, setSearchJob] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/jobposts')
      .then((response) => {
        setJobPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="home">
      <div className="header">
        <a href="http://localhost:3000/">🦁 JOBLION</a>
        <div className="search">
          <input
            type="text"
            placeholder="확인하고 싶은 회사명을 적어주세요!"
            onChange={(e) => setSearchJob(e.target.value)}
          />
          <button
            type="submit"
            onClick={() =>
              navigate('/search_detail', { state: { searchJob: searchJob } })
            }
          > ⌕ </button>
        </div>
        <div className="join">
          <button onClick={() => navigate('/login')}>로그인</button>
          <button onClick={() => navigate('/signup')}>회원가입</button>
        </div>
      </div>

      <div className="banner">
        <h2>구인구직의 신세계로</h2>
        <p>쉽고 빠르게 확인하는 채용공고</p>
        <button onClick={() => navigate('/resume')}>지금 바로 자소서 작성하기</button>
      </div>

      <div className="content">
        <div className="titles">
          <p>💡채용 공고 한눈에 모아보기💡</p>
          <button
            onClick={() => {
              window.open('http://localhost:3000/post', '채용공고 올리기', 'resizable=no width=700 height=650');
            }}>
            공고를 올리고 싶다면?
          </button>
        </div>
        <div className="showcase">
          {jobPosts.map((jobPost, index) => (
            <div key={index} className="company">
              <button onClick={() => navigate('/show_detail', { state: { showJob: jobPost.id } })}>
                {jobPost.companyName} {jobPost.position}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="lower">
        <p>고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이 사자처럼(주)</p>
      </div>
    </div>
  );
}

export default Home;
