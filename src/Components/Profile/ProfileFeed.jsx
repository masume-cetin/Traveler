import React from "react";
import Profile from "./Profile";
import './ProfileFeed.css';
import Card from '../Card/Card.js'
import { useState , useEffect} from 'react';
import { Update } from "@material-ui/icons";
import UpdateCard from './PostUpdateCard/PostUpdate'
import {useSharedProfileStates} from './ProfilePageUsebetweens'
import Event from '../EventCard/Event'
import {useSharedAction} from '../MainFeedPage/FeedActionSharedStates'

function ProfileFeed () {

const {isNewPostAdding,setisNewPostAdding} = useSharedProfileStates()
  const [DisplayFeed, setDisplayFeed] = useState(false)
  const [Update, setUpdate] = useState(true)
  const{comment,setcomment}=useSharedAction()

function showFeed(){
  setDisplayFeed(true)
}
function showPostFeed(){
  setDisplayFeed(false)
}

const NewEventAdding=async(e)=>{
e.preventDefault()
setUpdate(!Update)
}


useEffect(async() => {
    
  setcomment(false)
 
    
  }, []);

      return (
        <section className="content">
        <div className="feeder">
        <div ><Profile/></div>           
          </div>
          <div className="allthefeed">
          <button onClick={showPostFeed} className="showPosts">showPosts</button>
          <button onClick={showFeed} className="showEvents">showEvents</button>
          {DisplayFeed&&<div className="events" style={{display:'block'}}><div style={{display:'block'}}><Event></Event></div>
          </div>
           }
          {DisplayFeed==false&&
            <div className="postsdiv">
            <button style={{display:'block',marginLeft:'auto',marginRight:'auto'}} onClick={()=>setisNewPostAdding(true)} className="addPosts">+</button>
          {isNewPostAdding&&<UpdateCard></UpdateCard>}
            <div className="card"><Card/></div>
            </div>
            }
          </div>
        </section>
      );
  
  
  }

  export default ProfileFeed;