import React, { useState, useEffect } from 'react';
import './styles/Card.css';
import Header from './Header';
import img2 from './img/item.png';
import img3 from './img/locloc.png';
import img4 from './img/ring.png';
import img5 from './img/picpic.png';
import { useLocation } from 'react-router-dom';
import { useAuth } from './../AuthContext';

function Card() {
  const location = useLocation();

  const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
  const { userId, token } = auth; // userId와 token을 분해할당합니다.

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 실제 fetch 대신 고정된 정보를 사용합니다.
        const response = {
          status: 200,
          code: "C000",
          message: "회원정보 있음",
          userId: 2,
          name: "김농부",
          nickname: "사과농부꾼",
          location: "분당",
          phone: "01075214992",
          field: "1000",
          spec: "40년차",
          license: "자격증",
          tier: 1,
          description: "프로필 사진 올리기",
          image: null,
          item: "사과",
          items: [
            {
              createdAt: "2023-08-10 01:23:31",
              updatedAt: "2023-08-10 01:23:31",
              status: 1,
              itemId: 1,
              title: "사과",
              gram: 1000
            }
          ],
          records: [
            {
              createdAt: "2023-08-10 01:23:02",
              updatedAt: "2023-08-10 01:23:02",
              status: 1,
              recordId: 1,
              who: "x회사",
              what: "사과",
              size: "1",
              work: "준비중",
              date: "2023-08-01"
            }
          ]
        };

        if (response.status === 200) {
          setUserInfo(response);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle fetch error
      }
    };

    if (userId && token) {
      fetchUserInfo();
    }
  }, [userId, token]);

  return (
    <div className="Card">
      <Header />
      {userInfo ? <Boyd userInfo={userInfo} /> : null}
      <Lower />
    </div>
  );
}

function Boyd({ userInfo }) {
  
  return (
    <div className='containerCard'>
      <div className='card'>
        <div className='cardName'>
          {userInfo.image ? (
            <img className="userImg" alt="iconImg" src={userInfo.image} />
          ) : (
            <img className="userImg" alt="iconImg" src={img4} />
          )}
          <div>
            <div className='name'>{userInfo.name}[{userInfo.nickname}]</div>
            <div className='num'>{userInfo.phone}</div>
          </div>
        </div>
        <div className='cardInfo'>
          <div></div>
          <div></div>
          <div></div>
          <div className='num2'>{userInfo.phone} | <img className="icon" alt="iconImg" src={img4} /></div>
          <div className='item'>재배품목: {userInfo.item} | <img className="icon" alt="iconImg" src={img2} /></div>
          <div className='loc'>{userInfo.location} | <img className="icon" alt="iconImg" src={img3} /></div>
        </div>
      </div>
    </div>
  );
}

function Lower() {
  return (
    <div className="lower">
      <div className='lower'>
        <p>고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이 사자처럼(주)</p>
      </div>
    </div>
  );
}

export default Card;
