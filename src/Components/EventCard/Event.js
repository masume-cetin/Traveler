import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import {useSharedUrls} from '../baseUrlUseBetweens'
import { BsGearFill } from "react-icons/bs";
import { useSharedEventID } from "./SharedEventPutStates";
import UpdateEventCard from './EventPut'
import { BsPersonLinesFill } from "react-icons/bs";
import { useSharedAction } from "../MainFeedPage/FeedActionSharedStates";

const Event = () => {
  let Token = localStorage.getItem("userToken");
  const user = localStorage.getItem("userınfo")
  const {baseUrl} = useSharedUrls()
  let uri = baseUrl + "activity/"
  const [data, setData] = useState([]);
  const[id,setid]= useState("");
  const[isSettingsShown,setisSettingsShown]=useState(false)
  const {postID,setpostID} = useSharedEventID();
  const {isOpen,setisOpen} = useSharedEventID();
  const{ActivityName,setActivityName}=useSharedEventID();
  const{ActivityDate,setActivityDate}=useSharedEventID();
  const{ActivityCityName,setActivityCityName}=useSharedEventID();
  const{ActivityDistrictName,setActivityDistrictName}=useSharedEventID();
  const{File,setFile}=useSharedEventID();
  const{shouldput,setshouldput}=useSharedEventID();
  const[CommentData,setCommentData]=useState([]);
  const [isCommentsOpen, setisCommentsOpen] = useState(false)
  const{comment,setcomment}=useSharedAction()

  async function get() {
    var UserID =user
    const response = await axios.get(baseUrl+"activity"+"?"+"UserID="+user, {
      headers: { token: Token.replace(/"/g, "") },
    });
    const commentResponse = await axios.get(baseUrl+'activity-participants/', {
      headers: { token: Token.replace(/"/g, "") },
    });
    console.log(response.data)
    setData(response.data);
    setCommentData(commentResponse.data)
   
  }


  useEffect(()=>{
    (async () => {
      
      await get();
    
  })();
  }, []);
  useEffect(()=>{
    (async () => {
      
      await get();
    
  })();
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
    setshouldput(false)
  }

  const mapData = (card) => {
    return (
      <Card onClick={()=>setid(card.Id)} className="CardBorder" key={card.Id} style={{ width: "18rem" }}>
        <Button onClick={()=>setisSettingsShown(!isSettingsShown)} style={{display:'flex',float:'right'}}><BsGearFill/></Button>
        {isSettingsShown&&card.Id==id?<ul style={{display:'block',float:'right'}}><li onClick={updatePost}>update</li><li onClick={deletePost}>delete</li></ul>:null}
        <Card.Img className="CardImage" variant="top" src={"https://os.example.tr/"+card.ActivityImage}/>
        <Card.Body>
          <Card.Title>{card.ActivityName}</Card.Title>
          <Card.Text>
            {card.ActivityCityName},{card.ActivityDistrictName}
          </Card.Text>
          <Card.Title>{card.ActivityDate}
          <BsPersonLinesFill onClick={()=>setisCommentsOpen(!isCommentsOpen)} style={{display:'block',marginLeft:'20vh',marginTop:'3vh'}}></BsPersonLinesFill>
          </Card.Title>
        {isCommentsOpen&&<>{CommentData.map((comments)=>{
            
              return(<div>
               {comments.ActivityID==card.Id&&<li key={comments.ActivityID}>{comments.FirstName}</li>}
              </div>
           )       
         })} </>}
        </Card.Body>
      </Card>
    );
  };

  return ( <div> {data[0]!=null&&<>{data.map(mapData)}</>}
  {isOpen&&<div><UpdateEventCard></UpdateEventCard></div>}
  </div>
  )
};
export default Event;
