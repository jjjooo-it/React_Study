import { useState } from 'react';
import { useAuth } from './../AuthContext';
import axios from 'axios';
import './styles/ApplyWorker.css';

function Apply() {
    const [workerInfo, setWorkerInfo] = useState({
        name: '',
        age: '',
        foreigner: false,
        koreanLanguage: false,
        contact: ''
    });
    const [image, setImage] = useState(null);  // 이미지용 별도 상태
    const [previewImage, setPreviewImage] = useState(null);  // 미리보기 이미지 URL용 상태
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const {token} = auth;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'foreigner' || name === 'koreanLanguage') {
            setWorkerInfo({
                ...workerInfo,
                [name]: value === 'true',
            });
        } else {
            setWorkerInfo({
                ...workerInfo,
                [name]: value,
            });
        }
    };


    const postApply= async () => {
        try {
            const formData = new FormData();
            formData.append('name', workerInfo.name);
            formData.append('age', workerInfo.age);
            formData.append('foreigner', workerInfo.foreigner);
            formData.append('koreanLanguage', workerInfo.koreanLanguage);
            formData.append('contact', workerInfo.contact);

            if(image) {
                formData.append('file', image);
            }
            const response = await axios.post('/auth/job', 
            formData, {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMCIsImlhdCI6MTY5MjI4NDg2NSwiZXhwIjo1NDI0NzY0ODY1fQ.LjsMebqEz7yiclPpkcaBbozV9V7c2c-u4s_pGlX5e0M",
                    "Content-Type": "multipart/form-data"
                },
            });
            if(response.data.status===200){
                console.log(response);
                alert('공고 올리기에 성공하셨습니다');
            }
            else{
                console.log(response);
                alert('오류');
            }
        } catch (error) {
            console.log(error);
            alert(`실패: ${error.response ? error.response.data.message : "알 수 없는 오류"}`);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setPreviewImage(null);
        }
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        postApply();
    }

    return (
        <div className='Apply-form'>
            <h2>일꾼 지원서</h2>
            <h4>멋쟁이 농부처럼을 이용하여 손쉽게 일을 구해보세요!</h4>
            <p>외국인일 경우 재외국민등록증 첨부가 필수적입니다.</p>
            <p>건강한 농촌문화 형성을 위해 협조 부탁드립니다</p>
            <form>
                <div className='form-main'>
                    <label>
                        * 이름:
                        <input
                            type="text"
                            name="name"
                            value={workerInfo.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        * 나이:
                        <input
                            type="text"
                            name="age"
                            value={workerInfo.age}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>* 내국인/외국인:
                        <label>
                            <input type='radio' name='foreigner' value={false}
                                checked={!workerInfo.foreigner}
                                onChange={handleInputChange} /> 내국인
                        </label>
                        <label>
                            <input type='radio' name='foreigner' value={true}
                                checked={workerInfo.foreigner}
                                onChange={handleInputChange}/> 외국인
                        </label>
                    </label>
                    <label>* 한국어 가능 여부:
                        <label>
                            <input type='radio' name='koreanLanguage' value={false}
                                checked={!workerInfo.koreanLanguage}
                                onChange={handleInputChange} /> 불가능
                        </label>
                        <label>
                            <input type='radio' name='koreanLanguage' value={true}
                                checked={workerInfo.koreanLanguage}
                                onChange={handleInputChange} /> 가능
                        </label>
                    </label>
                    {previewImage && <img src={previewImage} alt="선택한 이미지 미리보기" style={{ width: '100px', height: '100px' }} />}
                    <label>* (외국인일 경우) 이민자등록증 첨부하기: <input type='file' onChange={handleFileChange} /></label>
                    <label>
                        * 연락처:
                        <input
                            type="text"
                            name="contact"
                            value={workerInfo.contact}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <button onClick={handleButtonClick}>제출하기</button>
            </form>
        </div>
    );
}

export default Apply;