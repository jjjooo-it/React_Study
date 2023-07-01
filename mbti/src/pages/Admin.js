import React,{useState} from 'react';
import './Admin.css';
import {useNavigate} from 'react-router-dom';

function Admin(){
    const navigate = useNavigate();
    const [mbti]= useState([
      ['E','I'],
      ['S','N'],
      ['T','F'],
      ['J','P']
    ]);
    const [mean] = useState(['에너지 방향','인식 방식','판단', '생활 양식']);

    return (
      <div className="Admin">
        <div className="upperTitle">
          <h2>MBTI</h2>
          <button onClick={()=>navigate('/')}>
            홈</button>
        </div>

        <div className='addMbti'>
            <p>성향추가</p>
            <input type='text' placeholder='성향을 적고 아래 mbti버튼을 눌러주세요'/>
        </div>

        <div className="chooseMbti">
          {mbti.map((a,i)=>{
              return(
                <div>
                 <input id={`one${i}`} name={i} type="radio" value={a[0]}/> 
                  <label for={`one${i}`}>{a[0]}</label>

                  <p className='mean'>{mean[i]}</p>

                  <input id={`two${i}`}name={i} type="radio" value={a[1]}/> 
                  <label for={`two${i}`}>{a[1]}</label>
              </div>
              )
            })}
        </div>

           <div className="completeBtn">
                <input onClick={()=>{alert("mbti 업데이트 성공! 홈으로 이동합니다.");
                   navigate('/');
                }}
                  type='submit' value={"MBTI 추가"}/>
           </div>

        <div className="lowerTitle"></div>

      </div>
    );
}
export default Admin;