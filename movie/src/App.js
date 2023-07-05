import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react";

function App() {
  const [counter,setValue]=useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = ()=> setValue((prev=>prev+1));
  const onChange = (e)=> setKeyword(e.target.value);
  
  useEffect(()=>{//useEffect를 사용하면 한번만 실행
    console.log("run only once")
  },[]);
  useEffect(()=>{
    if(keyword!=""&&keyword.length>4)
    console.log("search for", keyword);
  },[keyword]) //keyword가 변화할 때만 함수 실행
              //[]를 dependency라고 함

  return (
    <div className="App">
      <input value={keyword} 
        onChange={onChange}
       type="text" 
       placeholder='Search here...'></input>
        
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
