import Header from './Header';
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import './styles/slick.css';
import './styles/slick-theme.css';
import './styles/FindWorker.css';
import axios from 'axios';

function FindWorker_Main() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <nextArrow />,
    prevArrow: <prevArrow />,
  };
  
  const [workerList, setWorkerList] = useState([]);
  const[workerImg, setWorkerImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  
  useEffect(() => {
    async function fetchWorkerList() {
      try {
        const response = await axios.get('/auth/job'); 
        
        if (response.data.status === 200) {
          setWorkerList(response.data.jobList);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchWorkerList();
  }, []);
  const get_auth_job = {
    "status": 200,
    "code": "N001",
    "message": "JOB 불러오기 성공",
    "jobList": [
    {
    "createdAt": "2023-08-17 18:58:06",
    "updatedAt": "2023-08-17 18:58:06",
    "status": 1,
    "jobId": 3,
    "name": "박농부",
    "age": 24,
    "foreigner": false,
    "koreanLanguage": true,
    "document": null,
    "contact": "010-1111-2222"
    },
    {
    "createdAt": "2023-08-17 18:14:06",
    "updatedAt": "2023-08-17 18:14:06",
    "status": 1,
    "jobId": 2,
    "name": "김일꾼",
    "age": 24,
    "foreigner": false,
    "koreanLanguage": true,
    "document": null,
    "contact": "010-3333-4444"
    },
    {
    "createdAt": "2023-08-17 18:13:47",
    "updatedAt": "2023-08-17 18:13:47",
    "status": 1,
    "jobId": 1,
    "name": "제임스",
    "age": 24,
    "foreigner": true,
    "koreanLanguage": true,
    "document": "https://firebasestorage.googleapis.com/v0/b/applepie-f030c.appspot.com/o/스크린샷 2023-08-07 174218-documentnull.png?alt=media",
    "contact": "010-1234-5678"
    }
    ]
    }
  
  return (
    <>
      <Slider {...settings}>
        {get_auth_job.jobList.map((a, i) => (
          <div className='findworker-text' key={i}>
            <div className='findworker-col'>
              <h4>{a.name}</h4>
              <p>{"한국어 불가"}</p>
              <p>{a.contact}</p>
              <p> "재외국민 등록증 인증 완료" </p>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}

function FindWorker() {
  return (
    <>
      <Header />
      <div className='findworker-title'>
        <p style={{ padding: "13px", fontWeight: "bold" }}><span className='s1'>검증된</span>&nbsp;일꾼을 구해보세요</p>
        <p style={{ fontSize: "15px" }}>불법체류 여부 검증을 통해 건강한 농촌 문화를 만들어요:{')'}</p>
      </div>
      <FindWorker_Main />
      <div className="lower">
        <p>고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이 농부처럼(주)</p>
        <h2>LIKE FARMER</h2>
      </div>
    </>
  );
}

export default FindWorker;
