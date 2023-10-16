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
  
  return (
    <>
      <Slider {...settings}>
        {workerList.map((worker, i) => (
          <div className='findworker-text' key={i}>
            <img src={workerImg} alt={`Worker ${i}`} />
            <div className='findworker-col'>
              <h4>{worker.name}</h4>
              <p>{worker.koreanLanguage ? "한국어 가능" : "한국어 불가"}</p>
              <p>{worker.contact}</p>
              <p className='s2'>{worker.document ? "재외국민 등록증 인증 완료" : "재외국민 등록증 확인 필요"}</p>
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
