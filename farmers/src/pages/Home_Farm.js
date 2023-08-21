import { useState, useEffect } from 'react';
import './styles/Home_Farm.css';
import Header from './Header';
import { BiEdit } from 'react-icons/bi';
import {AiFillEdit}from 'react-icons/ai';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import {FaLocationDot} from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import img3 from './img/locloc.png';
import chat from './img/chat.png';
import { useAuth } from './../AuthContext';


//1. 프로필 (완료)
function HomeProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfoFromLocation = location.state || {};
    const get_auth_profile_userId = {
        "status": 200,
        "code": "C000",
        "message": "회원정보 있음",
        "userId": 2,
        "name": "김농부",
        "nickname": "n",
        "location": "분당",
        "phone": "01075214992",
        "field": "1000",
        "spec": "40년차",
        "license": "자격증",
        "tier": 1,
        "description": "프로필 사진 올리기",
        "image": "https://firebasestorage.googleapis.com/v0/b/applepie-f030c.appspot.com/o/picpic-profile2.png?alt=media",
        "item": "사과 풀스택",
        "items": [
            {
                "createdAt": "2023-08-10 01:23:31",
                "updatedAt": "2023-08-10 01:23:31",
                "status": 1,
                "itemId": 1,
                "title": "사과",
                "gram": 1000
            }
        ],
        "records": [
            {
                "createdAt": "2023-08-10 01:23:02",
                "updatedAt": "2023-08-10 01:23:02",
                "status": 1,
                "recordId": 1,
                "who": "x회사",
                "what": "사과",
                "size": "1",
                "work": "준비중",
                "date":"2023-08-01"
            }
        ]
    }
    
    const [homeProfile, setHomeProfile] = useState({
        name: '',
        nickname: '',
        image: '',
        item: '',
    });
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.

    const handleCardButtonClick = () => {
        navigate('/Card', { state: { userId: userId, token: token } });
    };
    const handleInfoButtonClick = () => {
        navigate('/info', { state: { userId: userId, token: token } });
    };

  
    return (
        <div className='propro'>
        <div className='profile'>
            <img className='profile-img' src={get_auth_profile_userId.image} />
            <h4>{get_auth_profile_userId.name} 농부님 어서오세요!</h4>
            <hr></hr>
            <p>{get_auth_profile_userId.nickname}</p>
            <p>⛤{get_auth_profile_userId.item} 풀스택⛤</p>
            <button className='profile-btn-card' onClick={handleCardButtonClick}>내 명함</button>
            <button onClick={handleInfoButtonClick} className='profile-btn-edit'><BiEdit style={{ width: "20px", height: "20px", color: "gray" }} />수정하기</button>
        </div>
            <button onClick={()=>{navigate('/team')}}>브랜드 조회</button>
            <button onClick={()=>{navigate('/applyteam')}}>나만의 브랜드 만들기</button>
        </div>

    )

}

//2. 글 
function Board_Post() {
    const navigate = useNavigate();
    //(1)전체 글 보이기(완료)
    const [postList, setPostList] = useState([]);
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.
    const post_postId = {
        "status": 200,
        "code": "P003",
        "message": "POST 불러오기 성공",
        "post": {
        "createdAt": "2023-08-16 12:01:44",
        "updatedAt": "2023-08-17 03:53:47",
        "status": 1,
        "postId": 45,
        "userImage": "https://firebasestorage.googleapis.com/v0/b/applepie-f030c.appspot.com/o/picpic-profile2.png?alt=media",
        "userNickname": "김성민",
        "location": "강릉",
        "image": "https://firebasestorage.googleapis.com/v0/b/applepie-f030c.appspot.com/o/icon-u-post45.png?alt=media",
        "description": "강릉 감자 10kg 팝니다",
        "comments": [
        {
        "createdAt": "2023-08-17 03:54:29",
        "updatedAt": "2023-08-17 03:54:29",
        "status": 1,
        "commentId": 95,
        "nickname": "ee",
        "password": "ee",
        "content": "ee"
        }
        ]
        }
        }

    /////////////////////////////////////////////

    const [editID, setEditID] = useState(1);
    const [showCommentID, setShowCommentID] = useState(1);


    const clickEditBtn = postId => { //글수정
        setEditID(postId);
        navigate('/edit-write', { state: { postId: postId } })
    }

    const clickshowBtn = id => { //댓글보기
        setShowCommentID(id);
        setShowTF(!showTF);
    }
    const [showTF, setShowTF] = useState(false);
    /////////////////////////////////////////////
    return (
        <>
            <div className='board-total'>
                <p>나의 영농 일지</p>
                <button onClick={() => { navigate('/write') }}>오늘은 무슨일이 있었나요?</button>
                {/*전체 글 보여주기*/}
                    <div >
                        <div className='board-post'>
                            <div className='board-text'>
                              <div className='loc'>
                                  <FaLocationDot style={{ width: "16px", height: "16px",color: "black" }}/>
                                  <p style={{fontWeight :"bold"}}>{post_postId.post.location}</p>
                              </div>
                                <div className='board-text-title'>
                                    <p>작성: {post_postId.post.createdAt} | </p>
                                    <p>수정: {post_postId.post.updatedAt}</p>
                                </div>
                                <div className='board-text-btn'>
                                    <button ><AiFillEdit style={{ width: "15px", height: "15px",color: "gray" }}/>수정하기</button>
                                    <button ><RiDeleteBin6Fill style={{ width: "15px", height: "15px",color: "gray" }}/>삭제하기</button>
                                </div>
                            </div>
                            <div className='board-text-main' >
                                <img src={post_postId.post.image} style={{ width: "650px", height: "270px", marginTop: "20px" }} />
                                <p style={{fontSize:"18px"}}>{post_postId.description}</p>
                            </div>
                            <hr style={{width: "500px",borderTop:"1px dashed #bbb",marginBottom:"5px"}}></hr>
                            <button className="show"onClick={() => clickshowBtn(post_postId.postId)}>
                             <img style={{width:"18px", height:"18px"}}src={chat}></img>&nbsp;&nbsp;
                            <p>댓글</p></button>

                            {showTF && showCommentID === post_postId.postId ? <><Post_Comment postId={post_postId.postId}/> <Show_Comment postId={post_postId.postId}/></> : null}
                       </div>
                  </div>
   
        </div>
  </>
    )
}
//3. 댓글 (1)댓글 달기 
function Post_Comment(props) {
    const [postCommentData, setPostCommentData] = useState({
        nickname: '',
        password: '',
        content: '',
        postId: props.postId,
    });
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.
    const postComment = async () => {
        try {

            const response = await axios.post(`/auth/comment/${props.postId}`,
                postCommentData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
            console.log(response);
            alert('댓글달기에 성공하셨습니다');
        } catch (error) {
            console.log(error);
        }
    }
    //////////////////////////////////////
    return (
        <div className='board-comment'>
            <input
                type='text'
                placeholder='닉네임'
                onChange={(e) => {
                    setPostCommentData({ ...postCommentData, nickname: e.target.value });
                }}
            />
            <input
                type='password'
                placeholder='비밀번호'
                onChange={(e) => {
                    setPostCommentData({ ...postCommentData, password: e.target.value });
                }}
            />
            <br />
            <input
                className='comment-text'
                type='text'
                placeholder='댓글을 입력해주세요'
                onChange={(e) => {
                    setPostCommentData({ ...postCommentData, content: e.target.value });
                }}
            />

            <button
                onClick={async (e) => {
                    e.preventDefault();
                    postComment();
                }}
            >등록하기</button>
        </div>
    );

}

//3. 댓글 (2)댓글 보여주기
function Show_Comment(props) {
    const [commentList, setCommentList] = useState([]);
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.
    const get_auth_comment_postId = [
        {
        "commentId": 19,
        "nickname": "tiger",
        "content": "5kg 주문하고싶습니다",
        "postId": 7
        },
        {
        "commentId": 20,
        "nickname": "lion",
        "content": "저도 5kg 주문하고싶습니다",
        "postId": 7
        },
        {
        "commentId": 21,
        "nickname": "fly",
        "content": "저는 3kg 주문하고싶습니다",
        "postId": 7
        },
        {
        "commentId": 22,
        "nickname": "cat",
        "content": "저는 2kg 주문하고싶습니다",
        "postId": 7
        }
        ]
   
  
    //////////////////////////////////////
    return (
        <>
            {get_auth_comment_postId.length > 0 ? (
                get_auth_comment_postId.map((a, i) => (
                    <div className='comm' key={i}>
                        <p>{a.nickname}</p>
                        <p>{a.content}</p>
                        <button>삭제하기</button>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: "center" }}>댓글이 없습니다.</p>
            )}
            <hr style={{ width: "500px", borderTop: "1px dashed #bbb", marginBottom: "30px" }}></hr>
        </>
    );
}

//4. 티어 정보(완료)
function Tier() {
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.
    const get_auth_profile_userId = { /* ... your profile data here ... */ }

    const tier = get_auth_profile_userId.tier;
    const tierMapping = {
        1: "아기농부",
        2: "열정농부",
        3: "마스터농부",
    };
    const myTier = tierMapping[tier] || "";

    return (
        <div className='level'>
            <h4>티어 정보</h4>
            <p>당신은 <span style={{ fontWeight: "bold", color: "rgb(54, 131, 24)" }}>마스터농부</span>입니다!</p>
            <hr />
            <p>레벨 업을 하기 위해서는</p>
            <p>* 아기농부 ➡️ 열정농부<br />: 프로필 사진을 올려주세요!</p>
            <p>* 열정농부 ➡️ 마스터농부<br />: 글을 작성해주세요!</p>
        </div>
    );
}


function HomeFarm() {
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
export default HomeFarm;