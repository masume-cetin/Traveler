import React,{Component} from "react";
import ReactDOM from "react-dom";
import {BsFillCameraFill} from 'react-icons/bs';
import './Profile.css';
import {useState,useEffect} from 'react';
import ProfileFeed from "./ProfileFeed";
import Register from "../Register";
import axios from "axios";
import { tokenToString } from "typescript";
import { config } from "dotenv";
import {BsFillPencilFill} from "react-icons/bs";
import {BsCheckLg} from "react-icons/bs";
import {useSharedUrls} from '../baseUrlUseBetweens'
import {useSharedAction} from '../MainFeedPage/FeedActionSharedStates'
import { ImportContactsOutlined } from "@material-ui/icons";
import { BsGearFill } from "react-icons/bs";
import {useSharedProfileStates} from './ProfilePageUsebetweens'
import { Card, Button } from "react-bootstrap";
import AccountUpdateCard from './UserUpdateDelete/AccountUpdateCard'
import DeletePostCard from "./UserUpdateDelete/AccountDeleteCard";
import Password from "./UserUpdateDelete/Password";


function Profile(props){
    const[isAdresInputShown,setisAdresInputShown]= useState(false);
    const[isMailInputShown,setisMailInputShown]= useState(false);
    const [isShown, setIsShown] = useState(false);
    const[FirstName,setFirstName]=useState("")
    const[LastName,setLastName]=useState("")
    const[CityName,setCityName]=useState("")
    const[DistrictName,setDistrictName]=useState("")
    const[EmailAddress,setEmailAddress]=useState("")
    const [isNameInputShown,setisNameInputShown] = useState(false);
    let userınfo = localStorage.getItem("userınfo")
    const Id =userınfo
    let Token = localStorage.getItem("userToken")
    const[isDataLoaded,setisDataLoaded]=useState(false)
    const [userName,setuserName]=useState("")
    const [userMail,setuserMail]=useState("")
   const[userAddress,setUserAdress]=useState("")
   const {baseUrl} = useSharedUrls()
   const urı = baseUrl +'user/'+ userınfo
   const{comment,setcomment}=useSharedAction()
   const[iconList,seticonList]=useState(["https://i.pinimg.com/736x/33/27/5c/33275c9878cb50eba7b4d5915022e192.jpg","https://i.pinimg.com/564x/05/cd/7a/05cd7a0d49cc25f3957413b46d76b614.jpg","https://i.pinimg.com/564x/ff/9f/cf/ff9fcf7ef9cc540a9d5f500d067da5f7.jpg","https://i.pinimg.com/564x/af/96/fa/af96fa50c0b0e7e9ccf02dfa606958dc.jpg","https://i.pinimg.com/564x/64/bc/cb/64bccb3ec4216d99c80d6716a596e851.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqQ83sVeftpUh876pYmugfJx4sBTHL_mjWHA&usqp=CAU"])
   const[i,seti]=useState(0)
   const {isSettingsShown,setisSettingsShown}=useSharedProfileStates()
   const {isaccountupdate,setisaccountupdate}=useSharedProfileStates()
   const {isaccountdelete,setisaccountdelete}=useSharedProfileStates()
   const {ispassword,setispassword}=useSharedProfileStates()




  function setProfile(){
    seti(i+1)
    if(i==iconList.length){
        seti(0)
    }
    console.log(i)
  }

   function get(){
       console.log(urı)
       if(Token){
        axios.get(urı,
        { headers: {token : Token = Token.replace(/"/g,"") }})
          .then(res => {
            setuserName(res.data.FirstName+" "+res.data.LastName)
            setuserMail(res.data.EmailAddress)
            setFirstName(res.data.FirstName)
            setLastName(res.data.LastName)
            setEmailAddress(res.data.EmailAddress)
            setCityName(res.data.CityName)
            setDistrictName(res.data.DistrictName)
            setUserAdress(res.data.CityName+","+res.data.DistrictName)
            setisDataLoaded(true)
          })}
      }

     function changeUserName(){
          setisNameInputShown(true)
      }
      function changeMail(){
        setisMailInputShown(true)
      }
      function changeAddress(){
        setisAdresInputShown(true)
      }
      function submitName(){
        const headers = { 
            token : Token = Token.replace(/"/g,"") 
        };
        axios.put(baseUrl+'user',{FirstName,LastName,EmailAddress,CityName,DistrictName,Id}, { headers })
            .then(response => console.log(response));
            setisNameInputShown(false)
      }
      function submitMail(){
        const headers = { 
            token : Token = Token.replace(/"/g,"") 
        };
        axios.put(baseUrl+'user',{FirstName,LastName,EmailAddress,CityName,DistrictName,Id}, { headers })
            .then(response => console.log(response));
            setisMailInputShown(false)
      }
      function submitAddress(){
        const headers = { 
            token : Token = Token.replace(/"/g,"") 
        };
        axios.put(baseUrl+'user',{FirstName,LastName,EmailAddress,CityName,DistrictName,Id}, { headers })
            .then(response => console.log(response));
            setisAdresInputShown(false)
      }
      function updatePost(){
          setisaccountupdate(true)
      }
      function deletePost(){
          var id=userınfo
        const response = axios.delete(baseUrl+"user",{data: { Id:id },
            headers: { token: Token.replace(/"/g, "") },
          });
      }
      function deleteAccount(){
setisaccountdelete(true)
      }
      function changePassword(){
setispassword(true)
      }

    return(

        <section className="Profile">
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            {!isDataLoaded&&<div>{get()}</div>}
            <Button onClick={()=>setisSettingsShown(!isSettingsShown)} style={{display:'flex',float:'right'}}><BsGearFill/></Button>
        {isSettingsShown&&<ul style={{display:'block',float:'right'}}><li onClick={updatePost}>update account</li>
        <li onClick={deletePost}>delete user</li><li onClick={deleteAccount}>delete account</li>
        <li onClick={changePassword}>change password</li></ul>}
<div class="container mt-5">
<div class="row d-flex justify-content-center">
 <div class="col-md-7">
     <div class="card p-3 py-4">
         <div onClick={setProfile} class="ProfilePicHolder">
         <img class="ProfilePicHolder" visibility="true" src={iconList[i]}/>
         </div>
         <div class="text-center mt-3"> <span class="bg-secondary p-1 px-4 rounded text-white"></span>
         {!isNameInputShown&&
             <h5 class="mt-2 mb-0"  onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}  >{FirstName}{LastName}   
        {isShown &&  <BsFillPencilFill onClick={changeUserName}></BsFillPencilFill>}</h5> }
        {isNameInputShown&&
        <div style={{display:'flex'}}>
            <input placeholder="first name" class="mt-2 mb-0" style={{display:'block'}} onChange={(e)=>setFirstName(e.target.value)}></input>
            <input placeholder="last name" class="mt-2 mb-0" style={{display:'block'}} onChange={(e)=>setLastName(e.target.value)}></input>
            <BsCheckLg onClick={submitName}></BsCheckLg>
            </div>
        }
        {!isMailInputShown&&
        <span  onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} >{userMail}   {isShown &&<BsFillPencilFill onClick={changeMail}></BsFillPencilFill>}</span>}
        {isMailInputShown&&
        <div style={{display:'flex'}}>
            <input placeholder="e-mail" class="mt-2 mb-0" style={{display:'block'}} onChange={(e)=>setEmailAddress(e.target.value)}></input>
            <BsCheckLg onClick={submitMail}></BsCheckLg>
            </div>
        }
             <div class="px-4 mt-1">
        {!isAdresInputShown&&
                 <p class="fonts"  onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>{userAddress}   {isShown && <BsFillPencilFill onClick={changeAddress}></BsFillPencilFill>}</p>
        }
        {isAdresInputShown&&
        <div style={{display:'flex'}}>
            <input placeholder="cityName" class="mt-2 mb-0" style={{display:'block'}} onChange={(e)=>setCityName(e.target.value)}></input>
            <input placeholder="DistrictName" class="mt-2 mb-0" style={{display:'block'}} onChange={(e)=>setDistrictName(e.target.value)}></input>
            <BsCheckLg onClick={submitAddress}></BsCheckLg>
            </div>
        }
             </div>
             <div class="social-list">
             <ul>
                 <i class="fa fa-facebook">&ensp;</i> 
                 <i class="fa fa-dribbble">&ensp;</i>
                 <i class="fa fa-instagram">&ensp;</i>
                 <i class="fa fa-linkedin">&ensp;</i>
                 <i class="fa fa-google"></i>
             </ul>
             </div>
         </div>
     </div>
 </div>
</div>
</div>
{isaccountupdate&&<AccountUpdateCard></AccountUpdateCard>}
{isaccountdelete&&<DeletePostCard></DeletePostCard>}
{ispassword&&<Password></Password>}
        </section> 
    )

}

export default Profile;