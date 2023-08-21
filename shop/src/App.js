import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import data from './pages/Data';
import bg from './img/bg.png';

import DetailPage from './pages/Detail';
import EventPage from './pages/Event';

import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Info(props) { //정보를 담은 컴포넌트 
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i}.jpg`} alt="shoes" width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}
function App() {
  const navigate = useNavigate();
  let [shoes] = useState(data);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}>Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail',{state:{shoes:shoes}}) }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/event') }}>Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
             <>
                  <div className='main-bg' style={{backgroundImage:'url(' + bg+ ')',height: "300px", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                  <div className="container">
                    <div className="row">
                      {shoes.map((a,i)=>{
                        return(
                          <Info key={i} shoes={shoes[i]} i = {i+1}></Info>
                        );
                      })}
                    </div>
                  </div>
            </>
        } />
        <Route path="/detail/:id" element={<DetailPage shoes={shoes}/>}/>
        <Route path='/event' element={<EventPage />}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="*" element={<div>404 NotFound</div>} />
      </Routes>
    </>
  );
}

export default App;