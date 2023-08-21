import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './../AuthContext';
import Header from './Header';

function EditPost() {
    const [post, setPost] = useState({
        location: "",
        description: "",
    });
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const postId = location.state.postId;

    const { auth } = useAuth();
    const { userId, token } = auth;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/post/${postId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                
                // 서버에서 받아온 개별 글 데이터를 상태에 저장합니다.
                setPost(response.data.post);
                
                // 서버에서 받아온 이미지 URL을 미리보기 이미지로 설정합니다.
                setPreviewImage(response.data.post.image);
                
            } catch (error) {
                console.error(error);
            }
        }
        fetchPost();
    }, [postId, token]);

    const handleInputChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
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

    const handleFormSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('location', post.location);
            formData.append('description', post.description);

            if (image) {
                formData.append('file', image);
            }

            const response = await axios.patch(`/post/${postId}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response);
            alert("글이 성공적으로 수정되었습니다!");
            navigate(-1);

        } catch (error) {
            console.error(error);
            alert(`실패: ${error.response ? error.response.data.message : "알 수 없는 오류"}`);
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
                    {previewImage && <img src={previewImage} alt="선택한 이미지 미리보기" style={{ width: '100px', height: '100px' }} />}
                    <label>
                        사진 첨부:&nbsp;
                        <input type="file" name="image" onChange={handleFileChange} />
                    </label><br /><br />
                    <button onClick={handleButtonClick}>수정</button>
                </div>
            </div>
        </form>
    );
}

export default EditPost;