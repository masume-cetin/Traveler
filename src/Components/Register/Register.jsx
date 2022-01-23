import react from 'react';
import './Register.css';
import {Link} from 'react-router-dom';
import ProfileFeed from '../Profile/ProfileFeed';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import { formatMs } from '@material-ui/core';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Alert} from 'react-bootstrap'
import {useSharedUrls} from '../baseUrlUseBetweens'

function Register(){
    const navigate = useNavigate();
    const[EmailAddress,setEmail] = useState("");
    const[Password,setPassword] = useState("")
    const [pic, setpic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
    const [loading, setloading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [confirmPassword, setconfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [picMessage, setpicMessage] = useState("")
    const [FirstName, setname] = useState("")
    const [CityName, setCityName] = useState("")
    const [DistrictName, setDistrictName] = useState("")
    const[LastName,SetLastname]=useState("")
    const [error, setError] = useState(false)
    const {baseUrl} = useSharedUrls()

    

    const submitHandler= async(e)=>{
        e.preventDefault();

        if(Password!==confirmPassword){
            setMessage("passwords do not match")
        }
        else{
            setMessage(null)
            try {
                const config ={

                    headers: {
                         "Content-Type":"application/json",
                         "token":""
                    }
                }
                setloading(true)
                axios.post(baseUrl+"register",
                {FirstName,LastName,EmailAddress,Password,CityName,DistrictName}).then((response) =>{
                    console.log(response);
           localStorage.setItem('userToken',JSON.stringify(response.Token))
           localStorage.setItem('adress',"")
           navigate('/')
            setloading(false)})
            } catch (error) {
            setloading(false)
            }
        }

    }



    return(
<Form onSubmit={submitHandler}>
    <h1>REGISTER</h1>
       <section className="RegisterForm">
       <h3 className="RegisterFormheader">name</h3>
           <Form.Control className="RegisterFormInput"onChange={(e)=>setname(e.target.value)}></Form.Control>
           <h3 className="RegisterFormheader">Lastname</h3>
           <Form.Control className="RegisterFormInput"onChange={(e)=>SetLastname(e.target.value)}></Form.Control>
           <h3 className="RegisterFormheader">e-mail adress</h3>
           <Form.Control className="RegisterFormInput" onChange={(e)=>setEmail(e.target.value)}></Form.Control>
           <h3 className="RegisterFormheader">password</h3>
           <Form.Control className="RegisterFormInput"onChange={(e)=>setPassword(e.target.value)}></Form.Control>
           <h3 className="RegisterFormheader">confirm password</h3>
           <Form.Control className="RegisterFormInput"onChange={(e)=>setconfirmPassword(e.target.value)}></Form.Control>
           <h3 className="RegisterFormheader">city</h3>
           <Form.Control className="RegisterFormInput"onChange={(e)=>setCityName(e.target.value)}></Form.Control>
           <h3 className="RegisterFormheader">district</h3>
           <Form.Control className="RegisterFormInput"onChange={(e)=>setDistrictName(e.target.value)}></Form.Control>
           <section><Button type="submit" className="RegisterFormbutton">sign-up</Button>
           </section>
           <section className="Registerinfocheck">
               <h4 className="Registerinfo"><Link  to="/">Login</Link></h4>
               </section>
       </section>
       </Form>
    );
}
export default Register;