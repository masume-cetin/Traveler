import React from "react";
import "./updatePostCard.css"
import { useSharedPostID } from "./CardUpdateUseBetween";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useSharedUrls} from '../baseUrlUseBetweens'
import { useState, useEffect } from "react";
import axios from "axios";
import Image from 'react-bootstrap/Image'
import Card from './Card'

const UpdatePostCard=()=>{

    const {postID} = useSharedPostID();
    const {isOpen,setisOpen} = useSharedPostID();
    let Token = localStorage.getItem("userToken");
    const user = localStorage.getItem("userınfo")
    const {baseUrl} = useSharedUrls()
    const uri = baseUrl+'post/'+postID;
    const urı=baseUrl+'post/'
    const[PostImage,setPostImage]=useState("");
    const{PostContent,setPostContent}=useSharedPostID();
    const{PostCityName,setPostCityName}=useSharedPostID();
    const{PostDistrictName,setPostDistrictName}=useSharedPostID();
    const{File,setFile}=useSharedPostID();
    const{shouldput,setshouldput}=useSharedPostID();

    const submit=()=>{
      console.log("hereee")
     setshouldput(true)
     console.log(postID)
      const Id = postID
      const data={
        Id,PostContent,PostCityName,PostDistrictName,File
    }
      axios.put(urı, data,
        {
            headers: {token : Token = Token.replace(/"/g,"") },
       })
          .then((response) => {
            console.log(response)
            setisOpen(false)
           })
           .catch((error) => {
             console.log(error.message);
             setshouldput(false)
           });
           (async () => {
      
            await get();
          
        })();   
    }

    async function get() {
      const response = await axios.get(uri, {
        headers: { token: Token.replace(/"/g, "") },
      });
      setPostImage(response.data.PostImage)
      setPostContent(response.data.PostContent)
      setPostDistrictName(response.data.PostDistrictName)
      setPostCityName(response.data.PostCityName)     
    }

    useEffect(async () => {
   if(isOpen){
    await get();
   }
      
    }, []);

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
    function handleChange1(e) {
      setPostContent(e.target.value);
    }
    function handleChange2(e) {
      setPostCityName(e.target.value);
    }
    function handleChange3(e) {
      setPostDistrictName(e.target.value);
    }
    

    return (
        <div className="updateCard">
            <div style={{ display: 'block', 
                  width: 700, 
                  padding: 30,
                  zIndex:3 }}>
      <h4>React-Bootstrap Form Component</h4>
      
      
          <label>current image:</label>
          <Image className="CardImage" variant="top" src={"https://os.example.tr/"+PostImage}></Image>
          <label>select new image:</label>
          <input onChange={(e)=>convertBase64(e)} type="file" />
       
        
          <label>Enter new post content:</label>
          
          <input onClick={handleChange1} type="text" 
                        placeholder={PostContent} />
        
          <label>Enter new city:</label>
          <input onChange={handleChange2} type="text" placeholder={PostCityName} />
        
          <label>Enter new district:</label>
          <input onChange={handleChange3} type="text" placeholder={PostDistrictName} />
        
        <Button onClick={submit} variant="primary" type="submit">
           Update Post
        </Button>
      
    </div>
        </div>
    )
}
export default UpdatePostCard