import React from 'react';
import './postUpdate.css'
import { useState,useCallback } from 'react';
import {Button } from 'react-bootstrap';
import {useSharedProfileStates} from '../ProfilePageUsebetweens'
import {Modal} from 'react-modal'
import axios from 'axios';
import { useSharedUrls } from '../../baseUrlUseBetweens';
import { useSharedProfilUpdateStates } from './postRenderUseBetweens';

const PostUpdate=()=>{

const [File, setFile] = useState("");
const [PostContent, setPostContent] = useState("");
const { isNewPostAdding, setisNewPostAdding } = useSharedProfileStates();
const [PostCityName, setPostCityName] = useState("");
const [PostDistrictName, setPostDistrictName] = useState("");
let Token = localStorage.getItem("userToken")
    let userınfo = localStorage.getItem("userınfo")
    const[Base64,setBase64]=useState("")
    const[i,seti]=useState("")
    const {baseUrl} = useSharedUrls()
    const{isRendered,setisRendered} = useSharedProfilUpdateStates()



const convertBase64=(e)=>{
  setFile(e.target.files[0])
  return new Promise((resolve,reject)=>{
  const fileReader = new FileReader()
  if(File){
    fileReader.readAsDataURL(File); 
  fileReader.onloadend=()=>{
    resolve(fileReader.result)
    setFile(fileReader.result)
    console.log(fileReader.result)
  }
}  
  fileReader.onerror=()=>{
    reject("error")
  }
})

}

function addpost(){
  const data={
    File,PostContent,PostCityName,PostDistrictName
}
const urı = baseUrl+'post'

axios.post(urı, data,
  {
      headers: {token : Token = Token.replace(/"/g,"") },
 })
    .then((response) => {
      console.log(response)
      setisRendered(true)
      setisNewPostAdding(false)
     })
     .catch((error) => {
       console.log(error.message);
     });   


}

    return(
        
    <div className="cardBorder">
        <button onClick={()=>setisNewPostAdding(false)} className='postcloseButton'>x</button>
      <div  className='popup_open'>
    <input onChange={(e)=>convertBase64(e)} style={{display:'block'}} type="file"></input>
    <input onChange={(e)=>setPostContent(e.target.value)} placeholder="enter post content" style={{display:'block',width:'45vh',minHeight:'fit-content'}}  type="text"></input>
    <input onChange={(e)=>setPostDistrictName(e.target.value)} placeholder="enter district" style={{display:'block',width:'45vh',minHeight:'fit-content'}}  type="text"></input>
    <input onChange={(e)=>setPostCityName(e.target.value)} placeholder="enter city" style={{display:'block',width:'45vh',minHeight:'fit-content'}}  type="text"></input>
    <Button onClick={addpost} style={{display:'block'}} >submit post</Button>
    </div>
   </div>
    )

}

export default PostUpdate