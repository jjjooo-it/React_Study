import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles/Home_Farm.css';

function ProfileInfo() {
    const [profile, setProfile] = useState({});
    const [records, setRecords] = useState([]);
    const [inventory, setInventory] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // userId는 알려진 값이거나 props로 전달될 것으로 가정합니다. 필요에 따라 조정하세요.
        const userId = 2;
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjkxNTczMTUwLCJleHAiOjU0MjQwNTMxNTB9.FZimhlaTengZe-GN3433woPLkiyvGuyPoC6-d2BLROA";
        axios.get(`/user/profile/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.status === 200) {
                    setProfile({
                        image: response.data.image || "기본_이미지_링크",
                        nickname: response.data.nickname,
                        location: response.data.location,
                        phone: response.data.phone,
                        field: response.data.field,
                        spec: response.data.spec,
                        license: response.data.license
                    });
                    setInventory(Array.isArray(response.data.items) ? response.data.items : []);
                    setRecords(response.data.records || []);
                }
            })
            .catch(error => {
                console.error("프로필 데이터를 가져오는데 오류가 발생했습니다:", error);
            });
    }, []); // 빈 의존성 배열을 사용하여 효과가 한 번만 실행되게 합니다.

    return (
        <>
            <Header />
            <div className='profileInfoContainer'>
                <div className='profileBox'>
                    <img src={profile.image} alt="profile" className='profileImage' />
                    <hr />
                    <p className='name'>{profile.nickname}</p>
                    <p className='location'>{profile.location}</p>
                    <p className='phone'>{profile.phone}</p>
                    <p className='field'>{profile.field}</p>
                    <p className='crops'>{profile.spec}</p>
                    <p className='status'>{profile.license}</p>
                    <button onClick={() => navigate('/edit-profile')}>수정하기</button>
                </div>

                {/* 인벤토리 부분은 그대로 유지하였습니다. */}
                <div className='inventoryBox'>
                    <h3>현재 농작물 상태</h3>
                    <hr />
                    {inventory.map(item => (
                        <p key={item.itemId}>
                            {item.title}🍎: {item.gram}g
                            <Link
                                to={`/edit-inventory?itemId=${item.itemId}`}
                                state={{
                                    itemId: item.itemId,
                                    title: item.title,
                                    gram: item.gram
                                }}
                            >
                                <button>수정하기</button>
                            </Link>
                        </p>
                    ))}
                </div>




                <div className='recordsBox'>
                    <h3>거래 내역</h3>
                    <hr />
                    {records.map(record => (
                        <div className='recordItem' key={record.recordId}>
                            <p><strong>거래 ID:</strong> {record.recordId}</p>
                            <p><strong>거래 날짜:</strong> {record.createdAt}</p>
                            <p><strong>업데이트 날짜:</strong> {record.updatedAt}</p>
                            <p><strong>회사:</strong> {record.who}</p>
                            <p><strong>물품:</strong> {record.what}</p>
                            <p><strong>크기:</strong> {record.size}</p>
                            <p><strong>상태:</strong> {record.status === 1 ? '활성' : '비활성'}</p>
                            <p><strong>작업:</strong> {record.work}</p>
                            <p><strong>데이터:</strong> {record.data}</p>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default ProfileInfo; 