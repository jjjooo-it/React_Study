import React,{useState} from 'react';
import './Admin.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Admin(){
    const navigate = useNavigate();
    const [userMbti,setUserMbti] = useState(['']);
    const [mbti]= useState([
      ['E','I'],
      ['S','N'],
      ['T','F'],
      ['J','P']
    ]);
    const [mean] = useState(['에너지 방향','인식 방식','판단', '생활 양식']);
    const [addDetail, setAddDetail] = useState(['']);

    const updateMbti = () =>{
      axios.post('http://49.247.33.67:8080/mbti/',{
         mbti: `${userMbti[0]}${userMbti[1]}${userMbti[2]}${userMbti[3]}`,
         info: addDetail
      })
         .then(res=>{
            alert("mbti 업데이트 성공! 홈으로 이동합니다.");
            navigate('/');
         })
         .catch(e=>{
          console.log(e);
           alert("실패");
         })
    }

    return (
      <div className="Admin">
        <div className="upperTitle">
          <h2>MBTI</h2>
          <button onClick={()=>navigate('/')}>
            홈</button>
        </div>

        <div className='addMbti'>
            <p>성향추가</p>
            <input type='text' placeholder='성향을 적고 아래 mbti버튼을 눌러주세요'
            onChange={e=> setAddDetail(e.target.value)}/>
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

                  <input id={`two${i}`}name={i} type="radio" value={a[1]}
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
                <input onClick={()=>{updateMbti()}}
                  type='submit' value={"MBTI 추가"}/>
           </div>

        <div className="lowerTitle"></div>

      </div>
    );
}
export default Admin;