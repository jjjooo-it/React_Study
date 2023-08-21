import React, {useState} from 'react';
import './Post.css';
import axios from 'axios';

function Post(){
    const [input_name,set_inputName] = useState(['']);
    const [input_position, set_inputPosition] = useState(['']);
    const [input_description, set_inputDescription] = useState(['']);

    const postJob = () =>{
        axios.post('http://localhost:8080/jobposts',{ 
           companyName : input_name,
           position : input_position,
           descripton : input_description
        })
           .then(res=>{
              alert("공고 올리기에 성공하셨습니다!");
           })
           .catch(e=>{
            console.log(e);
            alert("공고 올리기에 실패하셨습니다.");
           })
    }

    return (
        <div className='post'>
            <p>채용공고 올리기</p>
            <div className='post-detail'>
                <p>회사 이름</p>
                <input type='text' onChange={(e)=>{set_inputName(e.target.value)}}></input>
                <p>직무</p>
                <input type='text' onChange={(e)=>{set_inputPosition(e.target.value)}}></input>
                <p>설명</p>
                <input id="d" type='text' onChange={(e)=>{set_inputDescription(e.target.value)}}
                placeholder='자세한 설명은 빠른 구인에 도움이 됩니다 :)'></input>
            </div>
            <button onClick={()=>{
                postJob();
            }}>제출하기</button>
        </div>
    );
}
export default Post;