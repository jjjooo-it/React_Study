import React, {useState} from 'react';
import './Home.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Home(){ 
    const navigate = useNavigate();
    const [userMbti,setUserMbti] = useState(['']);

    const [mbti]= useState([
      ['E','I'],
      ['S','N'],
      ['T','F'],
      ['J','P']
    ]);
    const [mean] = useState(['에너지 방향','인식 방식','판단', '생활 양식']);
    const [userDetail, setDetail] = useState('');

    const getDetail =()=>{
        axios.get(`http://localhost:8080/mbti/${userMbti[0]}${userMbti[1]}${userMbti[2]}${userMbti[3]}`)
        .then(res=>{
          const copy = [...userDetail];
          copy = res.data.info;
          setDetail(copy);
        }) 
          .catch(e=>{
            alert("실패");
          })      
    }

    return (
      <div className="Home">
        <div className="upperTitle">
          <h2>MBTI</h2>
          <button onClick={()=>navigate('/admin')}>
            관리자 페이지</button>
        </div>
        <div className="chooseMbti">
          {mbti.map((a,i)=>{
              return(
                <div key={i}>
                 <input id={`one${i}`} name={i} type="radio" value={a[0]}
                 onClick={(e)=>{
                  let copy = [...userMbti];
                  copy[i] =  e.target.value;
                  setUserMbti(copy);
                 }}/> 
                  <label htmlFor={`one${i}`}>{a[0]}</label>

                  <p className='mean'>{mean[i]}</p>
                  <input id={`two${i}`} name={i} type="radio" value={a[1]}
                   onClick={(e)=>{
                    let copy2 = [...userMbti];
                    copy2[i] =  e.target.value;
                    setUserMbti(copy2);
                   }}/> 
                  <label htmlFor={`two${i}`}>{a[1]}</label>
              </div>
              )
            })}

        </div>

        <div className="completeBtn">
              <input type='submit' value={"확인"} onClick={()=>{
                getDetail();
                navigate('/result',{state:{mbti:userMbti, detail:userDetail}});}}/>
           </div>

        <div className="lowerTitle"></div>
      </div>
    );
};
export default Home;
