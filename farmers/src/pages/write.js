import { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../AuthContext';
import './styles/write.css';

function CreatePost(props) {
    const [post, setPost] = useState({
        location: "",
        description: "",
    });
    const [image, setImage] = useState(null);  // 이미지용 별도 상태
    const [previewImage, setPreviewImage] = useState(null);  // 미리보기 이미지 URL용 상태
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    }

    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.

    const handleFormSubmit = async () => {
        try {
            // 새 FormData 인스턴스 생성
            const formData = new FormData();

            // 내용을 FormData에 첨부
            formData.append('location', post.location);
            formData.append('description', post.description);

            // 이미지 첨부
            if (image) {
                formData.append('file', image);
            }

            // 포스트 데이터를 보내기 위한 Axios 요청
            const postResponse = await axios.post('/post/save', formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            });

            console.log(postResponse);
            alert("글이 성공적으로 생성되었습니다!");

            // 게시글 작성 후 프로필 정보를 업데이트한 다음 이전 페이지로 돌아갑니다.
            if (props.onProfileUpdate) {
                props.onProfileUpdate();
            }

            navigate(-1);

        } catch (error) {
            console.error(error);
            alert(`실패: ${error.response ? error.response.data.message : "알 수 없는 오류"}`);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        } else {
            setPreviewImage(null);
        }
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        handleFormSubmit();
    }

    return (
        <form>
            <Header />
            <div className='profileInfoContainer'>
                <div className='create-post-form'>
                    <label>
                        위치:&nbsp;
                        <input type='text' name="location" value={post.location} onChange={handleInputChange} />
                    </label><br /><br />
                    <label>
                        설명:&nbsp;
                        <textarea name="description" value={post.description} onChange={handleInputChange} />
                    </label><br /><br />
                    {/* 이미지 미리보기 */}
                    {previewImage && <img src={previewImage} alt="선택한 이미지 미리보기" style={{ width: '100px', height: '100px' }} />}
                    <label>
                        사진 첨부:&nbsp;
                        <input type="file" name="image" onChange={handleFileChange} />
                    </label><br /><br />
                    <button onClick={handleButtonClick}>제출</button>
                </div>
            </div>
        </form>
    );
}

export default CreatePost;