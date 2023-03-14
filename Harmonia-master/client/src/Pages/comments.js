import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import {useHistory, useParams} from 'react-router-dom'
import logo from '../images/logo.png'
import cart from '../images/cart.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import '../CSS/HomePage.css'
import profile from '../images/user-1.png'
import buy from '../images/buy-1.jpg'
import Navbar from './navbar'

function ProductDetails({match}){
    let history = useHistory();
    const [product, setProduct] = useState([]);
    const [product2, setProduct2] = useState([]);
    const[size, setSize] = useState([]);
    const[color, setColor] = useState([]);
    const[distributor, setDistributor] = useState([]);
    const[stock, setStock] = useState([]);
    const [colorInfo, setColorInfo] = useState("");
    const [distributorInfo, setDistributorInfo] = useState("");
    const [sizeInfo, setSizeInfo] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProductManager, setIsProductManager] = useState(false);
    const [reviewList, setReviewList] = useState([]);
    const [accountType, setType] = useState("Visitor");
    const [notNum, setNot] = useState(0);
    const [cartNum, setCart] = useState(0);
    const [userId, setUserId] = useState();
    Axios.defaults.withCredentials = true;

   
    
    useEffect(() => {
        Axios.get("http://localhost:3001/api/productdetails", {
            params: {
              pid: match.params.pid
            }
          }).then((response)=>{
            setProduct(response.data.products)
        })
    })
    useEffect(() => {
        Axios.get("http://localhost:3001/api/productsize", {
            params: {
                pid: match.params.pid
              }
            }).then((response)=>{
              setSize(response.data.products)
          })
    })
    useEffect(() => {
        Axios.get("http://localhost:3001/api/productcolor", {
            params: {
                pid: match.params.pid
              }
            }).then((response)=>{
              setColor(response.data.products)
          })
    })
    useEffect(() => {
        Axios.get("http://localhost:3001/api/productdistributor", {
            params: {
                pid: match.params.pid
              }
            }).then((response)=>{
              setDistributor(response.data.products)
          })
    })
    useEffect(() => {
        Axios.get("http://localhost:3001/api/productstock", {
            params: {
                pid: match.params.pid,
            },
            /*color: colorInfo,
            size: sizeInfo,
            distributor: distributorInfo*/
            }).then((response)=>{
              setStock(response.data.products)
          })
    })

   
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
                setUserId(53);
            }
        })
    })
    useEffect(() => {
        Axios.get("http://localhost:3001/api/showcard", {
            params: {
                uid: userId
              }
        }).then((response)=>{
            if(response.data.message === "OK"){
                setProduct2(response.data.products);
                setCart(product2.length);
            }
            else{
                setCart(0);
            }
        })
    }); 
    const approveReview = (val) => {
        Axios.put(`http://localhost:3001/api/approveReview`, {
            cid: val.cid,
            pid: val.pid,
        }).then((response) => {
            console.log(response.data.message);
        });
    };

    const removeReview = (val) => {
        Axios.delete(`http://localhost:3001/api/removeReview/${val.cid}`).then((response) => {
            console.log(response.data.message);
        });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/api/getPendingReviews",).then((response)=>{
              setReviewList(response.data.reviews);
          })
    })

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

    <table class="Table1">
        <tr>
            <th>Product</th>
            <th>User</th>
            <th>Comment</th>
            <th>Rating</th>
            <th>Approve</th>
        </tr>
        {reviewList.map((val) => {
        return <tr>
            <td>
                <div class="cart-info">
                <img src={val.picture}  alt="" ></img>
                <div>
                    <p>{val.productname}</p>
                    <small>Price: {val.price}</small>
                    <br></br>
            
                </div>
                </div>
            </td>
            <td>{val.name}</td>
            <td>{val.comment}</td>
            <td>{(val.rating <= 0.2) &&
                                <div>
                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                </div>

                            }
                            {(val.rating > 0.2 && val.rating <= 0.7) &&
                                <div>
                                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                </div>
                                
                            }
                            {(val.rating > 0.7 && val.rating <= 1.2) &&
                                <div>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                </div>
                            }
                            {(val.rating > 1.2 && val.rating <= 1.7) &&
                                <div>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                </div>
                            }
                            {(val.rating > 1.7 && val.rating <= 2.2) &&
                                <div>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                </div>
                            }
                            {(val.rating > 2.2 && val.rating <= 2.7) &&
                                <div>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                </div>
                            }
                            {(val.rating > 2.7 && val.rating <= 3.2) &&
                                <div>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                </div>
                            }
                            {(val.rating > 3.2 && val.rating <= 3.7) &&
                                <div>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                </div>
                            }
                            {(val.rating > 3.7 && val.rating <= 4.2) &&
                                <div>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                                </div>
                            }
                            {(val.rating > 4.2 && val.rating <= 4.7) &&
                                <div>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                </div>
                            }
                            {(val.rating > 4.7) &&
                                <div>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                
                                </div>
                            }</td>
            <td>
                <button type="button" class="btn" onClick = {()=> {approveReview(val)}}>Approve</button>
                <div class="divider"></div>
                <button type="button" class="btn" onClick = {()=> {removeReview(val)}}>Remove</button>
                </td>
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
export default ProductDetails;