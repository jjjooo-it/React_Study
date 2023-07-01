 import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Modal(props){ //부모(app)에서 자식(modal)에게 state 전송하려면
  return(              //props라는 문법 쓰면 됨
    <div className="modal" style={{backgroundColor:props.color}}>
          <h4>{props.title[props.mtitle]}</h4>
          <p>날짜</p>
          <p>상세내용</p>
          <button onClick={() => {
            let copy = props.title[props.mtitle];
            copy[0] = '여자코트추천';
            props.changeTitle(copy);
          } }>글수정</button>
  </div>
  )
}

function App() {
  let[title, changeTitle] = useState(['남자코트추천','강남우동맛집','파이썬독학','리액트독학']);
  let[mtitle, mTitle] = useState(0);
  let[like, addLike] = useState ([0,0,0,0]);
  let[modal,setModal] = useState(0);
  //배열 갯수 만큼 코드 실행
  //함수의 파라미터는 array 안에 있던 자료
  //return에 뭐 적으면 array로 담아줌
  [1,2,3].map(function(){ 

  })

  return (
    <div className="App">
      <div className="blogName">
        <h1>Blog</h1>
      </div>

      <button onClick={()=>{
        let copy=[...title];
        copy.sort();
        changeTitle(copy);
      }}>sort</button>

      <hr></hr> 

      {
        title.map(function(a,i){ //반복문은 map으로 구현 가능
          return (
            <div className="list">
            <h4 onClick={()=>{
              setModal(!modal); mTitle(i);
            }}>{a}<span onClick={()=>{
              let copy=[...like];
              copy[i]++;
              addLike(copy)}
              }>👍</span>{like[i]}</h4>
            <p>2023.6.28</p> 
          </div>
          )

        })
      }
      {
        modal== 1 ? <Modal color={"lightgray"} title={title} changeTitle={changeTitle} mtitle={mtitle}/> : null
      }
    </div>
  );
}

export default App;
