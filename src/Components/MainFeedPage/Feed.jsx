import React from "react";
import Card from '../Card/FeedCard.js'
import './Feed.css';
import { useState, useEffect } from "react";
import axios from "axios";
import {useSharedUrls} from '../baseUrlUseBetweens'
import {useSharedAction} from './FeedActionSharedStates'
import Event from "../EventCard/FeedEvent.js";

function Feed(){
    
    let Token = localStorage.getItem("userToken");
    const user = localStorage.getItem("userınfo")
    const {baseUrl} = useSharedUrls()
    const uri = baseUrl+'user';
    const{comment,setcomment}=useSharedAction()

    useEffect(async() => {
    
      setcomment(true)
     
        
      }, []);

return(
<div className='feed-content'><Card></Card><Event></Event></div>
    )
}

export default Feed