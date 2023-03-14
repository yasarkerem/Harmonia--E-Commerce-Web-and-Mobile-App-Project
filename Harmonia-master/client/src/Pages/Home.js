import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import logo from '../images/logo.png'
import image1 from '../images/image4.png'
import cart from '../images/cart.png'
import category1 from '../images/category-1.jpg'
import category2 from '../images/category-2.jpg'
import category3 from '../images/category-3.jpg'
import exclusive from '../images/exclusive5.png'
import mastercard from '../images/mastercard.png'
import visa from '../images/visa.png'
import paypal from '../images/logo-paypal.png'
import bitcoin from '../images/bitcoin.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import Axios from 'axios';
import '../CSS/HomePage.css'
import Navbar from './navbar'




function Home(){
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accountType, setType] = useState("Visitor");
    const [notNum, setNot] = useState(0);
    const [cartNum, setCart] = useState(0);
    const [userId, setUserId] = useState();
    const [product, setProduct] = useState([]);

    Axios.defaults.withCredentials = true;
  
    useEffect(() => {
        Axios.get("http://localhost:3001/api/featuredproducts").then((response)=>{
            setFeaturedProducts(response.data.products)
        })
    }, [])

    useEffect(() => {
        Axios.get("http://localhost:3001/api/latestproducts").then((response)=>{
            setLatestProducts(response.data.products)
        })
    }, [])

   
  

   

    let history = useHistory();
    
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
            <div class="header">
            <div class="container2">
           <Navbar/>
            
            <div class="row">
                <div class="col-2">
                    <h1>Give Yourself<br/>A New Style!</h1>
                    <p>Fashion isn't always about greatness. It's about consistency.
                        Consistent<br />hard work gains success. Greatness will come.
                    </p>
                    <a href="/invoice" class="btn">Explore Now &#8594;</a>
                </div>
                <div class="col-2">
                <img src={image1}  alt="Image1"></img>
                </div>
            </div>
            </div>
         </div>
         
         <div class="categories">
            <div class="small-container">
                <div class="row">
                    <div class="col-3">
                        <img src={category1} alt=""></img>
                    </div>
                    <div class="col-3">
                        <img src={category2} alt=""></img>
                    </div>
                    <div class="col-3">
                        <img src={category3} alt=""></img>
                    </div>
                </div>
            </div>

         </div>

         <div class="small-container">
             <h2 class="title">Featured Products</h2>
             <div class="row">
                {featuredProducts.map((val) =>{
                    return <div class="col-4">
                    <a href={"/productdetails/"+val.pid}>
                        <img src = {val.picture} alt = ""></img>
                    </a>
                    <a href={"/productdetails/"+val.pid}>
                        <h4>{val.name}</h4>
                    </a>
                    <p>$ {val.price}</p>
                    <div class="ProductStars">
                            {(val.rating <= 0.2) &&
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
                            }
                            </div>
                    </div>
                })}
              </div>
                     
             </div>
             <div class="small-container">
             <h2 class="title">Latest Products</h2>
             <div class="row">
                {latestProducts.map((val) =>{
                    return <div class="col-4">
                    <a href={"/productdetails/"+val.pid}>
                        <img src = {val.picture} alt = ""></img>
                    </a>
                    <a href={"/productdetails/"+val.pid}>
                        <h4>{val.name}</h4>
                    </a>
                    <p>$ {val.price}</p>
                    <div class="ProductStars">
                            {(val.rating <= 0.2) &&
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
                            }
                            </div>
                    </div>
                })}
             </div>
             </div>
             
            <div class="offer">
            <div class="small-container">
                <div class="row">
                    <div class="col-2">
                        <img src={exclusive} class="offer-img" alt=""></img>
                    </div>
                    <div class="col-2">
                        <p>Exclusively Available on Hermonia</p>
                        <h1>Hayri Irving VII</h1>
                        <small>Hayri Irving VII features a 39.9% more capable duration with colorful custimizaiton so it can reflect the style of yours.</small>
                    </div>

                </div>

            </div>
         </div>

         <div class="brands">
            <div class="small-container">
                <div class="row">
                    <div class="col-5">
                        <img src={paypal} alt=""></img>
                    </div>
                    <div class="col-5">
                        <img src={visa} alt=""></img>
                    </div>
                    <div class="col-5">
                        <img src={mastercard} alt=""></img>
                    </div>
                    <div class="col-5">
                        <img src={bitcoin} alt=""></img>
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
export default Home;