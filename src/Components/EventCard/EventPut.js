import React from "react";
import './EventPut.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSharedEventID } from "./SharedEventPutStates";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from 'react-bootstrap/Image'
import {useSharedUrls} from '../baseUrlUseBetweens'
import DateTimePicker from 'react-datetime-picker';
import Event from './Event'

const UpdateEventCard=()=>{
    const {postID} = useSharedEventID();
    const {isOpen,setisOpen} = useSharedEventID();
    let Token = localStorage.getItem("userToken");
    const user = localStorage.getItem("userınfo")
    const {baseUrl} = useSharedUrls()
    const urı=baseUrl+'activity/'
    const[PostImage,setPostImage]=useState("");
    const{ActivityName,setActivityName}=useSharedEventID();
    const{ActivityDate,setActivityDate}=useSharedEventID();
    const{ActivityCityName,setActivityCityName}=useSharedEventID();
    const{ActivityDistrictName,setActivityDistrictName}=useSharedEventID();
    const{File,setFile}=useSharedEventID();
    const{shouldput,setshouldput}=useSharedEventID();

    async function get() {
        const response = await axios.get(urı, {
          headers: { token: Token.replace(/"/g, "") },
        });
        setPostImage(response.data.PostImage)
        setActivityName(response.data.ActivityName)
        setActivityDistrictName(response.data.ActivityDistrictName)
        setActivityCityName(response.data.ActivityCityName)
        setActivityDate(response.data.ActivityDate)     
      }
  
      useEffect(async() => {
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

      const submit=()=>{
        
        const Id = postID
      const data={
        Id,ActivityName,ActivityDate,ActivityCityName,ActivityDistrictName,File
    }
      axios.put(urı, {Id:Id,ActivityName:ActivityName,ActivityDate:ActivityDate,ActivityCityName:ActivityCityName,ActivityDistrictName:ActivityDistrictName,File:File},
        {
            headers: {token : Token = Token.replace(/"/g,"") },
       })
          .then((response) => {
            console.log(response)
            Event.get()
            setshouldput(true)
        setisOpen(false)
           })
           .catch((error) => {
             console.log(error.message);
           });   
       }

      return (
        <div className="updateCard">
            <div style={{ display: 'block', 
                  width: 700, 
                  padding: 30,
                  zIndex:3 }}>
      <h4>React-Bootstrap Form Component</h4>
      <Form >
      <Form.Group>
          <Form.Label>current image:</Form.Label>
          <Image className="CardImage" variant="top" src={"https://os.example.com.tr/"+PostImage}></Image>
          <Form.Label>select new image:</Form.Label>
          <Form.Control onChange={(e)=>convertBase64(e)} type="file" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter new post content:</Form.Label>
          <Form.Control onChange={(e)=>setActivityName(e.target.data)} type="text" 
                        placeholder={ActivityName} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter new city:</Form.Label>
          <Form.Control onChange={(e)=>setActivityCityName(e.target.data)} type="text" placeholder={ActivityCityName} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter new district:</Form.Label>
          <Form.Control onChange={(e)=>setActivityDistrictName(e.target.data)} type="text" placeholder={ActivityDistrictName} />
        </Form.Group>
        <p>enter the date of the event</p>
                <DateTimePicker onChange={setActivityDate} value={ActivityDate}></DateTimePicker>
        <Button onClick={submit} variant="primary" type="submit">
           Update Post
        </Button>
      </Form>
    </div>
        </div>
    )

}

export default UpdateEventCard