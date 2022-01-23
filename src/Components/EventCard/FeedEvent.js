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
import { BsFillPersonPlusFill } from "react-icons/bs";
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
  const [ActivityID, setActivityID] = useState("")
  const{comment,setcomment}=useSharedAction()

  async function get() {
    var UserID =user
    const response = await axios.get(uri, {
      headers: { token: Token.replace(/"/g, "") },
    });
    const commentResponse = await axios.get(baseUrl+'activity-participants/'+user, {
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
 function postparty(){
     axios.post(baseUrl+"activity-participants",{ActivityID},{headers: { token: Token.replace(/"/g, "") },
    }).then((response)=>{
        console.log(response)
    }).catch((error) => {
        console.log(error.message);
      });
 }

  const mapData = (card) => {
    return (
      <Card onClick={()=>setid(card.Id)} className="CardBorder" key={card.Id} style={{ width: "18rem" }}>
        
        <Card.Img className="CardImage" variant="top" src={"https://os.example.com.tr/"+card.ActivityImage}/>
        <Card.Body>
          <Card.Title>{card.ActivityName}</Card.Title>
          <Card.Text>
            {card.ActivityCityName},{card.ActivityDistrictName}
          </Card.Text>
          <Card.Title>{card.ActivityDate}
          <BsFillPersonPlusFill onClick={()=>{setActivityID(card.Id); postparty()}} style={{display:'block',marginLeft:'20vh',marginTop:'3vh'}}></BsFillPersonPlusFill>
          </Card.Title>
    
        </Card.Body>
      </Card>
    );
  };

  return ( <div> {data.map(mapData)}
  </div>
  )
};
export default Event;