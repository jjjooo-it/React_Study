import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/Home";
import SearchDetailPage from "./pages/SearchDetail";
import ShowDetailPage from "./pages/ShowDetail";
import PostPage from "./pages/Post";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import ResumePage from "./pages/Resume";

function App(){
    return (     
      <Routes>
        <Route path="/" element = {<HomePage/>} />
        <Route path="/show_detail" element = {<ShowDetailPage/>} />
        <Route path="/search_detail" element = {<SearchDetailPage/>} />
        <Route path="/post" element = {<PostPage/>} />        
        <Route path="/signup" element = {<SignupPage/>} />
        <Route path="/login" element = {<LoginPage/>} />    
        <Route path="/resume" element={<ResumePage/>}></Route>    
        <Route path="*" element={<div>404 NotFound</div>}/>
      </Routes>    
    );
}


export default App;
 
