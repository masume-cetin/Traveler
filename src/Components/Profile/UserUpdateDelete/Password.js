import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useSharedUrls} from '../../baseUrlUseBetweens'
import { useState, useEffect } from "react";
import axios from "axios";
import Image from 'react-bootstrap/Image'
import { useSharedProfileStates } from "../ProfilePageUsebetweens";


const Password=()=>{

    const[Password,setPassword]=useState("")
    const[NewPassword,setNewPassword]=useState("")
    let Token = localStorage.getItem("userToken");
    const user = localStorage.getItem("userınfo")
    const {baseUrl} = useSharedUrls()
    const {ispassword,setispassword}=useSharedProfileStates()

function submit(){
    axios.put(baseUrl+"change-password",{Password,NewPassword},
        {headers: { token: Token.replace(/"/g, "") }},
      ).then((response) => {
        console.log(response)
        setispassword(false)
       })
       .catch((error) => {
         console.log(error.message);
       });
}
function close(){
    setispassword(false)
}
function handleChange(e) {
    setPassword(e.target.value);
  }
  function handleChange1(e) {
    setNewPassword(e.target.value);
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
        position:"fixed"
         }}>
            <div style={{ display: 'block', 
                  width: "30vh",
                  zIndex:3 }}>
        <button style={{display:'flex',float:'right'}} onClick={close} >x</button>
          <label>Password:</label>
          <input onClick={handleChange} type="text"  />
          <label>New Password:</label>
          <input onClick={handleChange1} type="text"  />
        <Button onClick={submit} variant="primary" type="submit">
           Change Password
        </Button>
      
    </div>
        </div>
    )

}

export default Password