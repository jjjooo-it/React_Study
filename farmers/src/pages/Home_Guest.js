import './styles/Home_Guest.css';
import Header from './Header_gs';
import { useState,useEffect} from 'react';
import {BiEdit} from 'react-icons/bi';
import {AiFillEdit}from 'react-icons/ai';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import {FaLocationDot} from 'react-icons/fa6';
import {useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import chat from './img/chat.png';


//1. 프로필 (완료)
function Guest_HomeProfile(){
    const navigate = useNavigate();
    return(
        <div className='profile-gs'>
           <h4>게스트님 어서오세요!</h4>
           <hr></hr>
           <br/>
           <button onClick={()=> navigate('/signup')}>회원가입하기</button>
           <button onClick={()=>{navigate('/login')}}>로그인하기</button>
        </div>
    )
}

//2. 글 
function Guest_Board_Post(){
    const navigate = useNavigate();
     //(1)전체 글 보이기(완료)
     const [postList,setPostList] = useState([]);
     const getAllPost = async () => {
         try {
             const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjkxNTczMTUwLCJleHAiOjU0MjQwNTMxNTB9.FZimhlaTengZe-GN3433woPLkiyvGuyPoC6-d2BLROA";
             const response = await axios.get('/auth/post', {
                 headers: {
                     "Authorization": `Bearer ${token}`,
                     "Content-Type": "application/json"
                 },
             });
             if(response.data.status === 200) {
                 setPostList(response.data.postList);
             }
         } catch (error) {
             console.log(error);
         }
     }
     useEffect(() => {
        getAllPost();
    }, []);
    
    /////////////////////////////////////////////
   
    const [showCommentID, setShowCommentID]= useState(1);
  
    const clickshowBtn =  id =>{ //댓글보기
        setShowCommentID(id);
        setShowTF(!showTF);
    }
    const [showTF,setShowTF] = useState(false);
    /////////////////////////////////////////////
    return(
        <>
            <div className='board-total'>
               <p>농부님들의 이야기를 확인하세요!</p>
            {/*전체 글 보여주기*/}
            {postList.map((a,i)=> (
                <div key={i}>
                <div className='board-post'>
                   <div className='board-text'>
                    <div className='loc'>
                         <FaLocationDot style={{ width: "16px", height: "16px",color: "red" }}/>
                          <p style={{fontWeight :"bold"}}>{a.location}</p>
                    </div>
                       <div className='board-text-title'>
                          <p>작성: {a.createdAt} | </p>
                          <p>수정: {a.updatedAt}</p>
                       </div>
                    </div>
                    <div className='board-text-main' key={i}>
                        <img src={a.image} style={{ width: "650px", height: "270px", marginTop:"20px"}}/>
                        <p style={{fontSize:"18px"}}>{a.description}</p> 
                    </div>
                    <hr style={{width: "500px",borderTop:"1px dashed #bbb",marginBottom:"5px"}}></hr>
                    <button className="show"onClick={() => clickshowBtn(a.postId)}>
                        <img style={{width:"18px", height:"18px"}}src={chat}></img>&nbsp;&nbsp;
                        <p>댓글</p></button>
                    {showTF && showCommentID === a.postId ? <><Post_Comment postId={a.postId}/> <Show_Comment postId={a.postId}/></> : null}
                </div>
                
                </div>
            ))}
            </div>
      </>
)}
//3. 댓글 (1)댓글 달기 
function Post_Comment(props){
    const [postCommentData,setPostCommentData] = useState({
        nickname : '',
        password : '',
        content : '',
        postId : props.postId,
    });
    const postComment = async () => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjkxNTczMTUwLCJleHAiOjU0MjQwNTMxNTB9.FZimhlaTengZe-GN3433woPLkiyvGuyPoC6-d2BLROA';
            const response = axios.post(`/comment/${props.postId}`, 
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
          <br/>
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
function Show_Comment(props){ 
    const [commentList, setCommentList] = useState([]);
useEffect(()=>{
    const getComment = async () => {
        try {
                const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjkxNTczMTUwLCJleHAiOjU0MjQwNTMxNTB9.FZimhlaTengZe-GN3433woPLkiyvGuyPoC6-d2BLROA';
                const response =  await axios.get(`/comment/${props.postId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                setCommentList(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
     };
     getComment();
},[])
    //(2)-1 댓글 삭제하기
    const deleteComment = async (commentId) => {
        const passwordInput = prompt("댓글을 삭제하려면 비밀번호를 입력하세요:");
        if (passwordInput !== null) {
            try {
                const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjkxNTczMTUwLCJleHAiOjU0MjQwNTMxNTB9.FZimhlaTengZe-GN3433woPLkiyvGuyPoC6-d2BLROA';
                const response = await axios.delete(`/comment/${props.postId}/${commentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        password: passwordInput
                    }
                });
                if (response.data.status === 200 ) {
                    console.log(response.data.message);
                    alert('댓글이 삭제되었습니다.');
                    setCommentList(commentList.filter(comment => comment.commentId !== commentId));
                } else{
                    alert('비밀번호가 틀립니다.');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    //////////////////////////////////////
    return (
        <> 
        {commentList.length>0?
        <p style={{marginLeft:"85px",fontSize:"14px"}}>댓글({commentList.length})</p>:null}
        {
        commentList.map((a, i) => (
            <div className='rroo'key={i}>
          <div className='comm' >
            <p style={{fontWeight:"bold"}}>{a.nickname}</p>
            <p>{a.content}</p>
          </div>
           <button onClick={() => deleteComment(a.commentId)}>❌</button>
           </div>
        ))}
    </>
      );   
}        
        
                         
function Guest_Tier(){
    return(
        <div className='level-gs'>
            <hr style={{marginTop:"40px"}}/>
            <p>멋쟁이 농부처럼을 통해<br/>믿을 수 있는 농부님들에게<br/>농작물을 값싸게 구매하세요!</p>
            <hr/>
        </div>
    )
}


function HomeGuest(){
    return (
        <>
         <Header/>
         <div className='home_farm-main'>
            <Guest_HomeProfile/>
            <Guest_Board_Post/>
            <Guest_Tier/>
         </div>

         <div className="lower">
              <p>고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이 농부처럼(주)</p>
              <h2>LIKE FARMER</h2>
        </div>
        </>
    );
}
export default HomeGuest;