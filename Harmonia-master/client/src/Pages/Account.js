import React, {useEffect, useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import logo from '../images/logo.png'
import Axios from 'axios';
import cart from '../images/cart.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import '../CSS/HomePage.css'
import "../CSS/Account.css";
import "../App.js";
import Navbar from './navbar'





function Account(){

    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [types, setType] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accountType, setaType] = useState("Visitor");
    const [notNum, setNot] = useState(0);
    const [cartNum, setCart] = useState(0);
    const [product, setProduct] = useState([]);

    Axios.defaults.withCredentials = true;

 
  

    
    const addUser = () => {
      Axios.post('http://localhost:3001/register', {
        fullname: fullname,
        email: email, 
        password: password,
        confirmpassword: confirmpassword,
        types: types
      }).then((response) => {
        console.log(response.data);
        if(response.data.message === "Succesfully registered!"){
           alert(response.data.message);
           window.location.reload(); 
        }
        else{
            alert(response.data.message);
        }
      });
    };
    
    const checkUser = () => {
        Axios.post('http://localhost:3001/login', {
          email: email,
          password: password
        }).then((response) => {
            console.log(response.data);
            if (response.data.message !== "OK")
            {
                setLoginStatus(response.data.message);
             }
            else
            {
                setLoginStatus("Successful Login!");
                alert("Logged In!")
                console.log("success");
                history.push("/");
            }
        });
      };

      
      
    function register(){
        var LoginForm = document.getElementById("logform");
        var RegForm = document.getElementById("regform");
        var Indicator = document.getElementById("Indicator"); 
        LoginForm.style.transform = "translateX(-300px)";
        RegForm.style.transform =  "translateX(-300px)";
        Indicator.style.transform = "translateX(100px)";
        setLoginStatus("");
        
        }
        
    function login(){
        var LoginForm = document.getElementById("logform");
        var RegForm = document.getElementById("regform");
        var Indicator = document.getElementById("Indicator"); 
        RegForm.style.transform =  "translateX(0px)";
        LoginForm.style.transform  = "translateX(0px)";
        Indicator.style.transform = "translateX(0px)";
        }
    
    let history = useHistory();

    useEffect(()=> {
        Axios.get("http://localhost:3001/login").then((response) => {
            /*console.log(response.data.loggedIn)*/                        /*infinite loopa girdiği için commentledim*/
            setIsLoggedIn(response.data.loggedIn);
            if(isLoggedIn){
                setaType(response.data.type);}
                else{
                    setaType("Visitor");
                }
        })
    })

    return (
        <html lang="eng">
        <head>
            <meta charSet="UTF-8"></meta>
            <title>RedStore | Ecommerce Website Design</title>
            <link rel="stylesheet" href="HomePage.css"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </head>
        <body class = "home">
          
            <div class="container2">
            <Navbar/>
            </div>

            <div class = "logreg-page">
            <div class= "container">
            <div class="row">
            <div class = "col-2">
            <div class = "form-container">
             <div class="form-btn">
                 <span title = "navbutton" onClick={login} >Login</span>
                 <span title = "navbutton2" onClick={register}>Register</span>
                 <hr id="Indicator"></hr>
             </div>
             <div class="alert" >
             <h3 title = "finally">{loginStatus}</h3>
             </div>
             <form id="logform">
                 <input type="email" placeholder="E-mail" title='email'
                 id="email" 
                 onChange={(event) => {
                   setMail(event.target.value);
                 }}></input>
                 <input type="password" placeholder="Password" title="password"
                 id="password" 
                 onChange={(event) => {
                   setPassword(event.target.value);
                 }}></input>
                 <button type="button" class="btn" onClick = {checkUser}title = "dummyButton">Login </button>
                 <a href="">Forgot Password</a>
             </form>
             <form id="regform">
                 <input type="text" placeholder="Full Name"
                 id="fullname"
                 onChange={(event) => {
                    setFullName(event.target.value);
                }}>
                </input>
                 <input type="email" placeholder="E-mail"
                 id="email"   
                 onChange={(event) => {
                    setMail(event.target.value);
                }}></input>
                 <input type="password" placeholder="Password"
                 id="password" 
                 onChange={(event) => {
                   setPassword(event.target.value);
                 }}></input>
                 <input type="password" placeholder="Enter your password again"
                 id="confirmpassword"
                 onChange={(event) => {
                   setConfirmPassword(event.target.value);
                 }}></input>
                   <label htmlFor="types">Choose an account type:</label>
                 <select name="types" 
                 id="types" onChange={(event) => {
                     setType(event.target.value);
                     }}>
                 <option value="customer">Customer</option>
          <option value="product manager">Product Manager</option>
          <option value="sales manager">Sales Manager</option>
                 </select>
                 <button type="button" class="btn" onClick = {addUser}>Register </button>
               
         
              
             </form>
            </div>

            </div>


            </div>



            </div>





            </div>
         





         <div class="footer">
            <div class="container">
                <div class="row">
                    <div class="footer-col-1">
                        <h3>Download Our App</h3>
                        <p>Download App for Android and ios mobile phone.</p>
                        <div class="app-logo">
                            <img src={playstore} alt=""></img>
                            <img src={appstore} alt=""></img>
                        </div>
                    </div>
                    <div class="footer-col-2">
                        <img src={logo} alt=""></img>
                        <p>Our Purpose Is To Sustainably Make the Pleasure.</p>
                    </div>
                    <div class="footer-col-3">
                        <h3>Usefull Links</h3>
                        <li>Coupons</li>
                        <li>Blog Post</li>
                        <li>Return Policy</li>
                        <li>Join Affiliate</li>
                    </div>
                    <div class="footer-col-4">
                        <h3>Follow Us</h3>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Youtube </li>
                        <li>Twitter</li>
                    </div>

                </div>
                <p class="Copyright">Copyright 2021</p>   
            </div>
         </div>
        
       
        </body>
        </html>
    
    )
   
   
}

export default Account;