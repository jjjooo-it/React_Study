import { useState,useEffect } from 'react';
import './styles/Home_Farm.css';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import './styles/Search.css';
import axios from 'axios';


function TodayInfo(){
  const [tip, setTip] = useState();
  const tipArray = [
     "고추 아주심기는 늦서리가 끝난 후 맑은 날에 심는 것이 좋아요",
     "33도 이상은 열사병 위험이 있어 외출을 자제하세요",
     "(AD)치악산 복숭아 당도 최고",
     "(AD)트랙터 구매 원하시는 분은 010-2222-3333으로 연락바랍니다",
      ];
  useEffect(() => {
    const tipNum = Math.floor(Math.random() * tipArray.length);
    setTip(tipArray[tipNum]);
  }, []);

  const navigate = useNavigate();
  return (
    <div className='todayinfo'>
    <div className='info'>
      <h4>오늘의 영농 꿀팁</h4>
      <hr/>
      <br/>
      <p>{tip}</p>
    </div>

    <div className='find'>
      <h4>일손이 부족하다면?</h4>
      <button onClick={()=>navigate('/findworker')}>여기를 클릭!</button>
    </div>
    </div>
  )
}

//검색하기
function Search_Main(){
  const navigate = useNavigate();
  const location = useLocation();
  const searchItem = location.state.search; //검색한 내용
  const [searchList, setSearchList]= useState([]);
  const post_auth_tier = {
    "status": 200,
    "code": "C003",
    "message": "회원 검색 성공",
    "users": [
        {
            "userId": 1,
            "nickname": "멋쟁이 농부",
            "name": "김농부",
            "item": "배배 사과 ",
            "image": null
        }
    ]
}

  return(
    <div className='search-main'>
    <p><span style={{fontWeight :"bold",color: "rgb(54, 131, 24)"}}>{searchItem}</span>(을)를 키우시는 농부님들을 확인하세요! [티어순 정렬]</p>
    <div className='sort'>
    <div className='sort-text'>
        <div>
          {post_auth_tier.users.map((a,i) => (
            <div className='search-text'key={i} >
            <img src={a.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
            <div className='search-col'>
            <h4>{a.name}</h4>
            <p>{a.nickname}</p>
            <p>{a.item}</p>
            </div>
     
            <p onClick={()=>{navigate('/card',{ state: { farmer: a.userId } })}}>클릭하여 명함 확인&nbsp;&nbsp;》</p>
          </div>
          ))}
        </div>
     
 
  </div>
  </div>
  </div>
  
  )
}
function Search(){
    return (
        <>
          <Header />
          <div className='search-whole'>
             <Search_Main/>
             <TodayInfo/>
          </div>
        </>
    );
}
export default Search;