import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import {useHistory, useParams} from 'react-router-dom'
import logo from '../images/logo.png'
import cart from '../images/cart.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import '../CSS/HomePage.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import StripeCheckout from "react-stripe-checkout";
import Navbar from './navbar'


function Cart({match}){
    let history = useHistory();

    const [product, setProduct] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProductManager, setIsProductManager] = useState(false);
    const [accountType, setType] = useState();
    const [notNum, setNot] = useState(0);
    const [cartNum, setCart] = useState(0);
    const [isPaid, setPaid] = useState(false);
    const [msg, setMSG] = useState("");
    const [userId, setUserId] = useState();
    const [emptyCard, setEmptyCard] = useState(false);
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [nm,setNm] = useState("");

    
    Axios.defaults.withCredentials = true;

    useEffect(()=> {
        Axios.get("http://localhost:3001/login").then((response) => {
            /*console.log(response.data.loggedIn)*/                        /*infinite loopa girdiği için commentledim*/
            setIsLoggedIn(response.data.loggedIn);
            if(response.data.loggedIn){
                if (response.data.type === "product manager")
                {
                    setIsProductManager(true);
                }
                setType(response.data.type);
                setUserId(response.data.user[0].id);
            }
            else if(isLoggedIn){
                ;
            }
            else{
                setType("Visitor");
                setUserId(53);
            }
        })
    })
    useEffect(() => {
        Axios.get("http://localhost:3001/api/showcard", {
            params: {
                uid: match.params.uid
              }
        }).then((response)=>{
            if(response.data.message === "OK"){
                setProduct(response.data.products);
                
            }
            else{
                setEmptyCard(true);
                
            }
            setCart(product.length);
        })
    });
    const handleToken = (token) => {
        console.log({token});
        setMSG(token.card.name + ", you have successfully ordered." );
        var cardaddress = token.card.address_line1+" "+token.card.address_city+"/"+token.card.address_country+" "+token.card.address_zip;
        var emailadd = 
        setAddress(cardaddress);
        setPaid(true);
        setEmail(token.email);
    };
    const giveOrder = () => {
        Axios.post("http://localhost:3001/api/giveorder", {
            products: product,
            uid: userId,
            address: address,
            price: sum
          }).then((response) => {
           



            alert(msg);
            
        });
     
            
         //order sayfasına yönlendirmeli 
         history.push("/orders/"+userId);



    };
    
    var i, sum = 0;
    for (i = 0; i < product.length; i++) {
      sum += (parseFloat(product[i].price*(100-product[i].discount_rate)/100).toFixed(2)) * product[i].quantity;
    }

    const removeProduct = (paid) => {
        Axios.put("http://localhost:3001/api/removeproductfromcard", {
            paid: paid,
            uid: userId
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


<div class="small-container cart-page">
    {emptyCard && 
    <p>There are no products in your card!</p>}
    {!emptyCard && <div>
    <table>
        <tr>
            <th>Product</th>
            <th>Remove</th>
            <th>Quantity</th>
            <th>Subtotal</th>
        </tr>
        {product.map((p) => {
                return <tr>
                <td>
                    <div class="cart-info">
                    <img src = {p.picture} alt = ""></img>
                    <div>
                        <p>{p.name}</p>
                        <small>Price: ${parseFloat(p.price*(100-p.discount_rate)/100).toFixed(2)}</small><br></br>
                        <small>{p.color}, {p.size}, {p.distributor}</small>
                        <br></br>
                    </div>
                    </div>
                </td>
                <td><button type="button" class="btn" onClick ={()=> {removeProduct(p.paid)}}><i class="fa fa-trash-o"></i></button></td>
                <td>{p.quantity}</td>
                <td>${parseFloat(p.quantity * p.price*(100-p.discount_rate)/100).toFixed(2)}</td>
            </tr>        
        })}
    </table>

    <div class="total-price">
        <table>
            <tr>
                <td>Subtotal</td>
                <td>${parseFloat(sum).toFixed(2)}</td>
            </tr>
            <tr>
                <td>Tax</td>
                <td>${parseFloat(sum*8/100).toFixed(2)}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>${parseFloat(sum*108/100).toFixed(2)}</td>
            </tr>
        </table>
        </div>
        {!isPaid && isLoggedIn &&
            <StripeCheckout
            stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
            token={handleToken}
            billingAddress
            shippingAddress
            amount={sum*108}
        />}
        
        </div>}

        {!isLoggedIn && 
        <a href="/login_register">Log In/Sign Up to Give Order</a>}
        {isPaid&&
            <button type="button" class="btn23" onClick = {giveOrder}><i class="fa fa-money fa-5x"></i></button>
        }
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
export default Cart;