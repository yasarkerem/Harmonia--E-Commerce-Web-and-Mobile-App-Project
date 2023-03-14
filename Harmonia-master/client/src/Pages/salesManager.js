import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import {useHistory, useParams} from 'react-router-dom'
import logo from '../images/logo.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import '../CSS/HomePage.css'
import Navbar from './navbar'

function ProductDetails({match}){
    let history = useHistory();
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProductManager, setIsProductManager] = useState(false);
    const [reviewList, setReviewList] = useState([]);
    const [accountType, setType] = useState("Visitor");
    
    const [userId, setUserId] = useState();
    const [orders, setOrders] = useState([]);
    const [orderAtts, setOrderAtts] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [status, setStatus] = useState("");
    Axios.defaults.withCredentials = true;
   
    useEffect(()=> {
        Axios.get("http://localhost:3001/login").then((response) => {
            /*console.log(response.data.loggedIn)*/                        
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
                setUserId(53);
            }
        })
    })

    useEffect(() => {
        Axios.get("http://localhost:3001/api/showallorders").then((response)=>{
            if(response.data.message === "OK"){
                setOrders(response.data.products);
            }
            else{
                setEmpty(true);
            }
        })
    }, []);

    const approve = (oid) => {
        Axios.post("http://localhost:3001/api/approve", {
            oid: oid,
            status: status
        }).then((response)=>{
            console.log(response.data.message);
        })
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


<div class="small-container cart-page">

    <table class="Table2">
        <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Current Status</th>
            <th>Refund Request</th>
            <th>Approve Refund</th>
            <th>Invoice</th>
            <th>          </th>
        </tr>
        {orders.filter((o) => {
                    if(o.status === "Refund (Pending)"){
                        return o;
                    }
                }).map((p) => {
        return <tr>
            <td>{p.oid}</td>
            <td>{p.date}</td>
            <td><h4>{p.status}</h4></td>
            <td>{p.request}</td>
            {p.status === "Refund (Pending)" && 
            <td><button type="button" class="btn" onClick ={()=> {approve(p.oid)}}>Approve</button></td>}
            {p.status !== "Refund (Pending)" && 
            <td></td>}
            <td><a href={"/invoice/"+p.oid} class="fa fa-file-pdf-o"></a></td>
        
        </tr>})}
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
export default ProductDetails;