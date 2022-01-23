import React from 'react'
import './AddEvent.css'
import { useState , useCallback} from 'react';
import { PausePresentationSharp } from '@material-ui/icons';
import { useSharedEventStates } from '../MapEventSharedStates';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { useSharedUrls } from '../../baseUrlUseBetweens';


const AddEvent=()=>{
    const{isPopupOpen,setisPopupOpen}=useSharedEventStates()
    const[ActivityName,setActivityName] = useState("");
    const[ActivityDate,setActivityDate] = useState("");
    const[Address,setAddress]=useState("")
    const[File,setFile]=useState("")
    let Token = localStorage.getItem("userToken")
    let userınfo = localStorage.getItem("userınfo")
    const {baseUrl} = useSharedUrls()

const Add=()=>{
    setAddress(localStorage.getItem('adress'))
    let Adresses = Address.split(",",2)
    let ActivityCityName = Adresses[0]
    let ActivityDistrictName = Adresses[1]
    console.log(Address)
    const data={
        ActivityName,ActivityDate,ActivityCityName,ActivityDistrictName,File
    }
    const urı = baseUrl+'activity'
    axios.post(urı, data,
    {
        headers: {token : Token = Token.replace(/"/g,"") },
   })
      .then((response) => {
        setisPopupOpen(false)
        localStorage.setItem('adress',"")
        console.log(response)
       })
       .catch((error) => {
         console.log(error.message);
       });   

}

function close(){
    setisPopupOpen(false)
    localStorage.setItem('adress',"")
}

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

    return(
        <div className='AddEventCard'>
            <button onClick={close} className='closeButton'>x</button>
            <div>
                <p>select an image for your activity</p>
                <input onChangeCapture={async(e)=>await convertBase64(e)} type="file"></input>
            </div>
            <div>
                <p>enter the name of the event</p>
                <input onChange={(e)=>setActivityName(e.target.value)} type="text"></input>
            </div>
            <div>
                <p>enter the date of the event</p>
                <DateTimePicker onChange={setActivityDate} value={ActivityDate}></DateTimePicker>
            </div>
            <div>
                <p>{localStorage.getItem('adress')}</p>                
            </div>
            <button onClick={Add}>ADD</button>
        </div>
    )
}

export default AddEvent