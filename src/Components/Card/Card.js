import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardImage,
} from "mdb-react-ui-kit";
import "./Card.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import {useSharedUrls} from '../baseUrlUseBetweens'
import { BsGearFill } from "react-icons/bs";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { useSharedPostID } from "./CardUpdateUseBetween";
import UpdatePostCard from './updatePostCard'
import { useSharedAction } from "../MainFeedPage/FeedActionSharedStates";
import { useSharedProfilUpdateStates } from "../Profile/PostUpdateCard/postRenderUseBetweens";

const FeedCard = () => {
  let Token = localStorage.getItem("userToken");
  const user = localStorage.getItem("userınfo")
  const {baseUrl} = useSharedUrls()
  const {baseImage} = useSharedUrls()
  let uri = baseUrl+'post';
  const [data, setData] = useState([]);
  const[CommentData,setCommentData]=useState([]);
  const[id,setid]= useState("");
  const[isSettingsShown,setisSettingsShown]=useState(false)
  const [isCommentsOpen, setisCommentsOpen] = useState(false);
  const {postID,setpostID} = useSharedPostID();
  const {isOpen,setisOpen} = useSharedPostID();
  const {comment,setcomment}=useSharedAction();
  const urı=baseUrl+'post'
    const{PostImage,setPostImage}=useSharedPostID();
    const{PostContent,setPostContent}=useSharedPostID();
    const{PostCityName,setPostCityName}=useSharedPostID();
    const{PostDistrictName,setPostDistrictName}=useSharedPostID();
    const{File,setFile}=useSharedPostID();
    const{shouldput,setshouldput}=useSharedPostID();
    const[commentToSend,setcommentToSend] = useState("")
    const{isRendered,setisRendered} = useSharedProfilUpdateStates()

  async function get() {
    if(Token){
 var UserID = user
    const response = await axios.get(baseUrl+"post"+"?"+"UserID="+user, {
      headers: { token: Token.replace(/"/g, "") },
    });
    setData(response.data);
    const commentResponse = await axios.get(baseUrl+'comment', {
      headers: { token: Token.replace(/"/g, "") },
    });
    setCommentData(commentResponse.data)
    console.log(CommentData)
   if(isRendered==true){
setisRendered(false)
   }}
  }


    useEffect(async() => {
    
      await get();
        
      }, []);
      useEffect(async() => {
    
        await get();
          
        }, [isRendered]);
        useEffect(async() => {
    
          await get();
            
          }, [isOpen]);

  function deletePost() {
    const Id = id
    console.log(Id)
    const response = axios.delete(uri,{data: { Id:id },
      headers: { token: Token.replace(/"/g, "") },
    });
    (async () => {
      
      await get();
    
  })();
  }

  function updatePost(){
    setpostID(id)
    console.log(postID)
    if(postID){
      setisOpen(true)
    }
    if(shouldput){
      (async () => {
      
        await get();
      
    })();
    }
  }
  function send(){
    const PostID =id
    const Comment = commentToSend
    console.log(Token,postID,commentToSend)
   axios.post(baseUrl+"comment",{PostID,Comment},{
      headers: { token: Token.replace(/"/g, "") }
    }).then((response)=>{
      (async () => {
      
        await get();
      
    })();
    })
   
  }
  function deletecomment(){
    const response = axios.delete(baseUrl+"comment",{data: { Id:id },
      headers: { token: Token.replace(/"/g, "") },
    });
  }

  const mapData = (card) => {
    if(card==null){
      return <p>there is no post yet</p>
    }
    return (
      <Card onClick={()=>setid(card.Id)} className="CardBorder" key={card.Id} style={{ width: "18rem",zIndex:2}}>
        <Button onClick={()=>setisSettingsShown(!isSettingsShown)} style={{display:'flex',float:'right'}}><BsGearFill/></Button>
        {isSettingsShown&&card.Id==id?<ul style={{display:'block',float:'right'}}><li onClick={updatePost}>update</li><li onClick={deletePost}>delete</li></ul>:null}
        <Card.Img className="CardImage" variant="top" src={"https://os.example.com.tr/"+card.PostImage}/>
        <Card.Body>
          <Card.Title>{card.PostContent}</Card.Title>
          <Card.Text style={{display:'block'}}>
            {card.PostCityName},{card.PostDistrictName}

            <BsFillChatLeftTextFill onClick={()=>setisCommentsOpen(!isCommentsOpen)} style={{display:'block',marginLeft:'20vh',marginTop:'3vh'}}></BsFillChatLeftTextFill>
          </Card.Text>
          {comment&&<div>
                <input onChange={(e)=>{setcommentToSend(e.target.value)}} type="text" placeholder="enter your comment"></input>
                <button onClick={send}>send</button></div>}
          {
          CommentData.map((comments)=>{
            { if(comments.PostID==card.Id&&isCommentsOpen)
              return(<div style={{display:"flex"}}>
               
              <li style={{paddingLeft:"3vh"}} key={comments.Id}>{comments.Comment}</li></div>
           )
          }        
          })}
        </Card.Body>
      </Card>
    );
  };

  return (<div>{data[0]!=null&&<>{data.map(mapData)}</>}
  {isOpen&&<div><UpdatePostCard></UpdatePostCard></div>}
  </div>)
};
export default FeedCard;
