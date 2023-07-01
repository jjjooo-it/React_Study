import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/Home";
import ResultPage from "./pages/Result";
import AdminPage from "./pages/Admin";

function App(){
    return (     
      <Routes>
        <Route path="/" element = {<HomePage/>} />
        <Route path="/result" element = {<ResultPage/>} />
        <Route path="/admin" element = {<AdminPage />}  />
        <Route path="*" element={<div>404 NotFound</div>}/>
      </Routes>    
    );
}


export default App;
 