import React, {useState,useEffect} from 'react';
import './Detail.css';
import {useLocation,useNavigate} from 'react-router-dom';
import axios from 'axios';

function SearchDetail(){
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log(location);
      }, [ location ])

      const search = location.state.searchJob; //search 시 사용될 식별자(회사이름)

      const [companyName,setCompanyName] = useState(['']);
      const [position,setPosition] = useState(['']);
      const [description, setDescription] = useState(['']);
      const [application, setApplication] = useState(['']);

      useEffect (() =>{
        axios.get(`http://localhost:8080/jobposts/${search}`)
       .then(res=>{
          setCompanyName(res.data.company_name);
          setPosition(res.data.position);
          setDescription(res.data.description);
          setApplication(res.data.application_link);
       }) 
       .catch(e=>{
         alert("존재하지 않는 회사입니다!");
         console.log(e);
       })  
   })
   return (  
    <div className='detail'>
        <p>채용정보</p>
        <div className='info'>
            <div className='title'>
              <p id="company-name">{companyName}</p>
              <p id="title-name">{position}</p>
            </div>
           <div className='applyinfo'>
              <p id='title'>설명 {description}</p>
              <p>{description}</p>
              <p id='title'>링크</p>
              <p>{application}</p>
           </div>
      </div>
      <div className='btn'>
      <button onClick={()=>(navigate('/'))}>홈</button>
      <button onClick={()=>(navigate('/resume'))} >자소서 작성하기</button>
      </div>

    </div>
    );

}
export default SearchDetail;