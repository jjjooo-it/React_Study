import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './styles/Brand.css';

function FarmerList() {
    const location = useLocation();
    const navigate = useNavigate();
    const [farmerList, setFarmerList] = useState([]);
    const brandId = location.state.brandId;

    useEffect(() => {
        const postFarmer = async () => {
            try {
                const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMCIsImlhdCI6MTY5MjI4NDg2NSwiZXhwIjo1NDI0NzY0ODY1fQ.LjsMebqEz7yiclPpkcaBbozV9V7c2c-u4s_pGlX5e0M";
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                };

                const response = await axios.post(`/auth/brand/farmer/${brandId}`, null, { headers });

                if (response.data.status === 200) {
                    setFarmerList(response.users);
                }
            } catch (error) {
                console.log(error);
            }
        };

        postFarmer();
    }, [brandId]);

    return (
        <>
            {farmerList.length > 0 ? (
                <div className='farmer-brand'>
                    {farmerList.map((a, i) => (
                        <div className='farmer-brand-content' key={i}>
                            <img src={a.file || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="Profile" />
                            <p>{a.userName}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>해당 브랜드에는 농부가 없습니다</p>
            )}
            <button onClick={() => navigate('/addfarmer', { state: { farmerList: farmerList } })}>브랜드에 들어가기</button>
        </>
    );
}

function BrandFarmerList() {
    return (
        <>
            <Header />
            <FarmerList />
        </>
    );
}

export default BrandFarmerList;
