import react from 'react';
import {useState} from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import {history} from 'react-router-dom'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import ProfileFeed from '../Profile/ProfileFeed';
import {useNavigate} from 'react-router-dom';
import {Alert} from 'react-bootstrap'
import {useSharedUrls} from '../baseUrlUseBetweens'

function Login(){

    const[EmailAddress,setEmail] = useState("");
    const[Password,setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setloading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [token,settoken]=useState("")
    const {baseUrl} = useSharedUrls()
     
   

    const submitHandler= async(e)=>{
        e.preventDefault();
       const data = {EmailAddress,Password}
       axios.post(baseUrl+'login', data,
       {
        headers: {
          "Content-Type": "application/json",
        },
      })
         .then((response) => {
            console.log(response);
           localStorage.setItem('userınfo',JSON.stringify(response.data.result.Id))
           localStorage.setItem('userToken',JSON.stringify(response.data.token))
           localStorage.setItem('adress',"")
           navigate('/profile')
          })
          .catch((error) => {
            console.log(error.message);
          });
    }

    return(
    <div className='login-content'>
        
       <Form className='LoginForm'onSubmit={submitHandler}>
       <h1>LOGIN</h1>
           <h3 className="Formheader">e-mail adress</h3>
           <Form.Control className="FormInput" onChange={(e)=>setEmail(e.target.value)}></Form.Control>
           <h3 className="Formheader">password</h3>
           <Form.Control className="FormInput" onChange={(e)=>setPassword(e.target.value)}></Form.Control>
           <section><Button type="submit" className="Formbutton">sign-in</Button>
           </section>
           <section className="infocheck">
           <h4 className="info"><Link to="/Register">register</Link></h4>
           </section>
           
       </Form>
       </div>
    );
}
export default Login;