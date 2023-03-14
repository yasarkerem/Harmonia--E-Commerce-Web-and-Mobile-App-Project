import React, { useState, useEffect, Component } from 'react'
import Axios from 'axios';
import {useHistory, useParams} from 'react-router-dom'
import logo from '../images/logo.png'
import cart from '../images/cart.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import '../CSS/HomePage.css'
import Navbar from './navbar'


function Orders({match}){
    
    let history = useHistory();

    const [orders, setOrders] = useState([]);
    const [orderAtts, setOrderAtts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProductManager, setIsProductManager] = useState(false);
    const [accountType, setType] = useState("Visitor");
    const [userId, setUserId] = useState();
    const [emptyCard, setEmptyCard] = useState(false);
    const [text, setText] = useState("");
    

    Axios.defaults.withCredentials = true;
    
    useEffect(() => {
        Axios.get("http://localhost:3001/api/showorders", {
            params: {
                uid: match.params.uid
              }
        }).then((response)=>{
            if(response.data.message === "OK"){
                setOrders(response.data.products);
            }
            else{
                setEmptyCard(true);
            }
        })
    }, []);

    useEffect(() => {
        Axios.post("http://localhost:3001/api/showorderatts").then((response)=>{
            if(response.data.message === "OK"){
                setOrderAtts(response.data.products);
            }
            else{
                setEmptyCard(true);
            }
        })
       
    }, []);

    const refund = (oid) => {
        Axios.post("http://localhost:3001/api/refund", {
            oid: oid,
            text: text
        }).then((response)=>{
            console.log(response.data.message);
        })
    };

    const cancel = (oid) => {
        Axios.post("http://localhost:3001/api/cancel", {
            oid: oid
        }).then((response)=>{
            console.log(response.data.message);
        })
    };

    var el = document.getElementById('button')
    if(el){
    el.addEventListener('click', function(){
        document.querySelector('.bg-modal').style.display = 'flex';
    });
    }

    var el2 = document.querySelector('.close')
    if(el2){
    el2.addEventListener('click', function(){
        document.querySelector('.bg-modal').style.display = 'none';
    });
    }

    var i, sum = 0;
    for (i = 0; i < orders.length; i++) {
      sum += orders[i].price * orders[i].quantity;
    }
    
    

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

            
<table>
    <tr>
        <th>Order ID</th>
        <th>Customer ID</th>
        <th>Products</th>
        <th>Days Remaining</th>
        <th>Order Status</th>
        <th> </th>
        <th>See Invoice</th>
        
    </tr>
    
    {orders.map((p) => {
        return <tr>
            <td>{p.oid}</td>
            <td>{p.uid}</td>
                {orderAtts.filter((o) => {
                    if(o.oid === p.oid){
                        return o;
                    }
                }).map((o) => {
                return <tr><td>
                    <div class="cart-info">
                        <img src = {o.picture} alt = ""></img>
                        <div>
                        <p>{o.name}</p>
                        <small>Price: ${o.price}</small>
                        <br></br>
                        <small>{o.color}, {o.size}, {o.distributor}</small>
                    </div>
                    </div>
                </td></tr>
                })}
            
        <td>{p.date}</td>
        <td><h4>{p.status}</h4></td>
        {p.status === "Delivered" &&
        <td>        <div class="bg-modal">
        <div class="modal-content">

            <div class="close">+</div>

            <div class="header2">
                            Write Your Request
                        </div>
                        <div class="element">
                            <textarea type="text" onChange = {(event) => {
                            setText(event.target.value);}}>
                            </textarea>
                        </div>
                        <div class="element">
                        <td><button type="button" class="btn" onClick ={()=> {refund(p.oid)}}>Refund</button></td>
                        </div>
        </div>
    </div><a href="#" id="button" class="btn">Refund</a></td>}
        {(p.status === "In-transit" || p.status === "Processing") && 
        <td><button type="button" class="btn" onClick ={()=> {cancel(p.oid)}}>Cancel</button></td>}

        {(p.status === "Refund (Pending)" || p.status === "Refund (Approved)") &&
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
export default Orders;