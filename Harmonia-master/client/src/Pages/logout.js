import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import {useHistory} from 'react-router-dom'
import logo from '../images/logo.png'

import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'


import '../CSS/HomePage.css'

import '../CSS/logout.css'

function LogOut(){ 

    const [message, setMessage] = useState("");
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:3001/logout").then((response)=>{
            setMessage(response.data.status);
        })
    })

    return (
        <html>
        <head>
        <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </head>
        <body class = "home">
      
          <div class="container2">
          
          <div class="navbar">
              <div class="logo23"> 
                   <img src={logo}  alt="Logo" ></img>
              </div>
            
          </div>
          </div>

          <div class = "logout-page">
            <div class= "container23">
            <div class="row">
            <h3>{message}
            <li><a href="/"><h3><i class="fa fa-home"></i> Home</h3></a></li></h3>
            
            
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

export default LogOut;