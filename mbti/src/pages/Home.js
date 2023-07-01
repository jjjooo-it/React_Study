import React, {useState} from 'react';
import './Home.css';
import {useNavigate} from 'react-router-dom';

function Home(){ 
    const navigate = useNavigate();
    const [mbti]= useState([
      ['E','I'],
      ['S','N'],
      ['T','F'],
      ['J','P']
    ]);
    const [mean] = useState(['에너지 방향','인식 방식','판단', '생활 양식']);
    const [userMbti,setUserMbti] = useState(['','','','']);
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
                <div>
                 <input id={`one${i}`} name={i} type="radio" value={a[0]}
                 onClick={(e)=>{
                  let copy= [...userMbti];
                  copy[i] = e.target.value;
                  setUserMbti(copy);
                 }}/> 
                  <label for={`one${i}`}>{a[0]}</label>

                  <p className='mean'>{mean[i]}</p>
                  <input id={`two${i}`} name={i} type="radio" value={a[1]}
                   onClick={(e)=>{
                    let copy= [...userMbti];
                    copy[i] = e.target.value;
                    setUserMbti(copy);
                   }}/> 
                  <label for={`two${i}`}>{a[1]}</label>
              </div>
              )
            })}
        </div>

        <div className="completeBtn">
              <input type='submit' value={"확인"} onClick={()=>{navigate('/result');}}/>
           </div>

        <div className="lowerTitle"></div>
      </div>
    );
};
export default Home;
