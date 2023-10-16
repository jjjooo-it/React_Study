import React, { useState } from 'react';
import axios from 'axios';
import './styles/ApplyTeam.css';

function ApplyTeam() {
    const [brandInfo, setBrandInfo] = useState({
        name: '',
        slogan: '',
        crops: '',
        introduce: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBrandInfo({
            ...brandInfo,
            [name]: value,
        });
    };

    const postBrand = async () => {
        try {
            const response = await axios.post('/brand', brandInfo);
            if (response.data.status === 200) {
                console.log(response);
                alert('브랜드 정보 등록에 성공하셨습니다');
            } else {
                console.log(response);
                alert('오류');
            }
        } catch (error) {
            console.log(error);
            alert(`실패: ${error.response ? error.response.data.message : "알 수 없는 오류"}`);
        }
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        postBrand();
    }

    return (
        <div className='Team-Apply-form'>
            <h2>팀 정보 등록</h2>
        
            <form>
                <div className='form-main'>
                    <label>
                        * 팀 이름 &nbsp;
                        <input
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <p></p>
                    <label>
                        * 슬로건 &nbsp;
                        <input
                            type="text"
                            name="slogan"
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <p></p>
                    <label>
                        * 취급 작물 &nbsp;
                        <input
                            type="text"
                            name="crops"
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <p></p>
                    <label>
                        * 한 줄 소개글 &nbsp;
                        <input
                            type="text"
                            name="introduce"
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <button onClick={handleButtonClick}>제출하기</button>
                <p></p>
            </form>
        </div>
    );
}

export default ApplyTeam;
