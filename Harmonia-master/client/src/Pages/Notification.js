import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import {useHistory, useParams} from 'react-router-dom'
import logo from '../images/logo.png'
import cart from '../images/cart.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import '../CSS/HomePage.css'
import disc from '../images/disco.png'
import tl100 from '../images/100tl.jpg'
import bogo from '../images/bogo.jpg'
import "../CSS/Notification.css"
import Navbar from './navbar'

function Notifications({match}){
    let history = useHistory();
    const [product, setProduct] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProductManager, setIsProductManager] = useState(false);
    const [accountType, setType] = useState("Visitor");
    const [notNum, setNot] = useState(0);
    const [cartNum, setCart] = useState(0);
    const [userId, setUserId] = useState();

    Axios.defaults.withCredentials = true;

    useEffect(()=> {
        Axios.get("http://localhost:3001/login").then((response) => {
            /*console.log(response.data.loggedIn)*/                        /*infinite loopa girdiği için commentledim*/
            setIsLoggedIn(response.data.loggedIn);
            
            if(isLoggedIn){
                if (response.data.type === "product manager")
                {
                    setIsProductManager(true);
                }
                setType(response.data.type);
                setUserId(response.data.user[0].id);
            }
            else{
                setType("Visitor");
            }
        })
    })

    useEffect(() => {
        Axios.get("http://localhost:3001/api/shownotifications", {
            params: {
                uid: match.params.uid
              }
        }).then((response)=>{
            if(response.data.message === "OK"){
                setProduct(response.data.products);
                
            }
            else{
                setEmpty(true);
                
            }
            setNot(product.length);
        })
    });

    const removeNotification = (nid) => {
        Axios.put("http://localhost:3001/api/removenotification", {
            uid: userId,
            nid: nid
        }).then((response) => {
            console.log(response.data.message);
        });
    };

    return (
        <html lang="eng">
        <head>
            <meta charset="UTF-8"></meta>
            <title>RedStore | Ecommerce Website Design</title>
            <link rel="stylesheet" href="HomePage.css"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </head>
        <body>
            
            <div class="container4">
            
            <Navbar/>    
            </div>


<div class="small-container notif-page">

    <table>
        <tr>
            <th>Notifications</th>
            <th>Remove</th>
        </tr>
        {product.map((p) => {
            return <tr>
            <td>
                <p>{p.text}</p>
            </td>
            <td><td><button type="button" class="btn" onClick ={()=> {removeNotification(p.nid)}}><i class="fa fa-close"></i></button></td></td>
            </tr>
        })}
        
    </table>

   


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
export default Notifications;