import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {input} from 'react-bootstrap';
import {useSharedUrls} from '../../baseUrlUseBetweens'
import { useState, useEffect } from "react";
import axios from "axios";
import Image from 'react-bootstrap/Image'
import { useSharedProfileStates } from "../ProfilePageUsebetweens";

const UpdatePostCard=()=>{

    const[FirstName,setFirstName]=useState("")
    const[LastName,setLastName]=useState("")
    const[EmailAddress,setEmailAddress]=useState("")
    const[Password,setPassword]=useState("")
    let Token = localStorage.getItem("userToken");
    const user = localStorage.getItem("userınfo")
    const {baseUrl} = useSharedUrls()
    const {isaccountupdate,setisaccountupdate}=useSharedProfileStates()

    function submit(){
        console.log(FirstName,LastName,EmailAddress,Password,Token)
        axios.put(baseUrl+"my-account", {FirstName,LastName,EmailAddress,Password},
            {
                headers: {token : Token = Token.replace(/"/g,"") },
           })
              .then((response) => {
                console.log(response)
                setisaccountupdate(false)
               })
               .catch((error) => {
                 console.log(error.message);
               });
    }
    function close(){
        setisaccountupdate(false)
    }
    function handleChange(e) {
        setFirstName(e.target.value);
      }
      function handleChange1(e) {
        setLastName(e.target.value);
      }
      function handleChange2(e) {
        setEmailAddress(e.target.value);
      }
      function handleChange3(e) {
        setPassword(e.target.value);
      }

    return (
        <div style={{ display: 'block', 
        width: "30vh",
        padding: 30,
        zIndex:3,
        borderWidth:"1vh",
        borderColor:"black",
        borderStyle:"solid",
        backgroundColor:"white",
        position:"center"
         }}>
            <div style={{ display: 'block', 
                  width: "30px",
                  padding: 30,
                  zIndex:3 }}>
            <button style={{float:'right',display:"flex"}} onClick={close} >x</button>
          <label>Name:</label>
          
          <input onClick={handleChange} type="text" 
                        />
        
          <label>LastName:</label>
          <input onClick={handleChange1} type="text"  />
        
          <label>EmailAddress:</label>
          <input onClick={handleChange2} type="text"  />
          <label>Password:</label>
          <input onClick={handleChange3} type="text"  />
        
        <Button onClick={submit} variant="primary" type="submit">
           Update Account
        </Button>
      
    </div>
        </div>
    )
}
export default UpdatePostCard