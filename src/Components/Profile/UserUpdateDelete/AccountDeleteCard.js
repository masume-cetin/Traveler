import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useSharedUrls} from '../../baseUrlUseBetweens'
import { useState, useEffect } from "react";
import axios from "axios";
import Image from 'react-bootstrap/Image'
import { useSharedProfileStates } from "../ProfilePageUsebetweens";



const DeletePostCard=()=>{

    const[Password,setPassword]=useState("")
    let Token = localStorage.getItem("userToken");
    const user = localStorage.getItem("userınfo")
    const {baseUrl} = useSharedUrls()
    const {isaccountdelete,setisaccountdelete}=useSharedProfileStates()

function submit(){
    axios.delete(baseUrl+"my-account",{data: { Password:Password},
        headers: { token: Token.replace(/"/g, "") },
      }).then((response) => {
        console.log(response)
        setisaccountdelete(false)
       })
       .catch((error) => {
         console.log(error.message);
       });
}
function close(){
    setisaccountdelete(false)
}
function handleChange(e) {
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
                  width: "30vh",
                  zIndex:3 }}>
        <button style={{display:'flex',float:'right'}} onClick={close} >x</button>
          <label>Password:</label>
          <input onClick={handleChange} type="text"  />
        
        <Button onClick={submit} variant="primary" type="submit">
           Delete
        </Button>
      
    </div>
        </div>
    )

}

export default DeletePostCard