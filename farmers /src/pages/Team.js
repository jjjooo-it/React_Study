import React, { useState, useEffect } from 'react';
import './styles/Team.css';
import Header from './Header';
import { useAuth } from './../AuthContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function HomeProfile() {
    const { auth } = useAuth();
    const { userId, token } = auth;
    const [homeProfile, setHomeProfile] = useState({
        name: '',
        nickname: '',
        image: '',
        item: '',
    });

    useEffect(() => {
        const getHomeProfile = async () => {
            try {
                const response = await axios.get(`/auth/home/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                if (response.status === 200) {
                    setHomeProfile({
                        name: response.data.user.name,
                        nickname: response.data.user.nickname,
                        image: response.data.user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                        item: response.data.user.item,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        getHomeProfile();
    }, [userId, token]);

    return (
        <div className='profile'>
            <img className='profile-img' src={homeProfile.image} alt="Profile" />
            <h4>{homeProfile.name} 농부님 어서오세요!</h4>
            <hr />
            <p>{homeProfile.nickname}</p>
            <p>⛤{homeProfile.item} 풀스택⛤</p>
        </div>
    );
}

function Board_Post() {
    const [brandList, setBrandList] = useState([]);
    const { auth } = useAuth();
    const { token } = auth;
        const navigate = useNavigate();
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('/auth/brand', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                console.log(response.data);
                if (response.data.status === 200) {
                    setBrandList(response.data.brands);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBrands();
    }, [token]);


    return (
        <div className='board-total'>
            <h3 className='orgName'>LikeFarmer Organizations</h3>
            <ul>
                {brandList.map(brand => (
                    <li
                        key={brand.brandId}
                        onClick={() => navigate('/brand',{state:{brandId : brand.brandId}})}
                        className='brand-item'
                    >
                        <strong>{brand.name}</strong>
                        <p>{brand.introduce}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// ... (나머지 컴포넌트 및 코드) ...



function Tier() {
    const { auth } = useAuth();
    const { userId, token } = auth;
    const [tier, setTier] = useState('');
    const [myTier, setMyTier] = useState('');

    useEffect(() => {
        const getTier = async () => {
            try {
                const response = await axios.get(`/auth/profile/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                if (response.data.status === 200) {
                    setTier(response.data.tier);
                    tier === 1 ? setMyTier("아기농부") : tier === 2 ? setMyTier("열정농부") : tier === 3 ? setMyTier("마스터농부") : setMyTier('');
                }
            } catch (error) {
                console.log(error);
            }
        }
        getTier();
    }, [userId, token]);

    return (
        <div className='level'>
            {/* 티어 정보 출력 */}
        </div>
    );
}

function Team() {
    return (
        <>
            <Header />
            <div className='home_farm-main'>
                <HomeProfile />
                <Board_Post />
                <Tier />
            </div>

            <div className="lower">
                <p>고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이 농부처럼(주)</p>
                <h2>LIKE FARMER</h2>
            </div>
        </>
    );
}

export default Team;
