import React, { useState, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import logo from '../images/logo.png'
import cart from '../images/cart.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import '../CSS/HomePage.css'
import '../CSS/ProductPage.css'
import Axios from 'axios';
import Navbar from './navbar'

function Products(){
    const [productList, setProductList] = useState([]);
    const [sortby, setSorting] = useState("");
    const [searchword, setSearching] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProductManager, setIsProductManager] = useState(false);
    const [accountType, setType] = useState("Visitor");
    const [notNum, setNot] = useState(0);
    const [cartNum, setCart] = useState(0);
    const [userId, setUserId] = useState();

    Axios.defaults.withCredentials = true;

    const sorted = productList.sort((a, b) => {
        var sorted = 0;
        if (sortby === "ascending_price"){
            if(a.price < b.price){
                sorted = -1;
            }else{
                sorted = 1;
            }
        }else if(sortby === "descending_price"){
            if(a.price < b.price){
                sorted = 1;
            }else{
                sorted = -1;
            }
        }else {  //sort by popularity (rating)
            if(a.rating < b.rating){
                sorted = 1;
            }else{
                sorted = -1;
            }
        }
        return sorted;
    });

    useEffect(()=> {
        Axios.get("http://localhost:3001/login").then((response) => {
            /*console.log(response.data.loggedIn)*/                        /*infinite loopa girdiği için commentledim*/
            setIsLoggedIn(response.data.loggedIn);
            if(response.data.loggedIn){
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
        Axios.get("http://localhost:3001/api/products").then((response)=>{
            setProductList(response.data.products);
        })
    })


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
            <script defer src="https://use.fontawesome.com/release/v5..6/js/all.js"></script>
        </head>
        <body>

        <div class="search-box">
              <input class= "search-txt" type="text" name="" placeholder="Type to search" title="search"
                onChange = {(event) => {
                    setSearching(event.target.value);
                }}/>
              <a class ="search-btn" href="#/">
               <i class= "fa fa-search"></i>
              </a>
            </div>
            
            <div class="container4">
            <Navbar/>

            </div>
            {accountType=="product manager" &&
                
                <div class="AddPhotoBtnHomePage"><a href="/productsDetailManager" class="btn">Add Product</a></div>
            }
         <div class="small-container">

             <div class="row row-2">
                 <h2>All Products</h2>
                 <select name = "sortby" id = "sortby" onChange = {(event) => {
                     setSorting(event.target.value);
                 }}>
                     <option value = "default"> Defualt Sorting</option>
                     <option value = "ascending_price">Sort by ascending price</option>
                     <option value = "descending_price">Sort by descending price</option>
                     <option value = "popularity">Sort by popularity</option>
                 </select>
             </div>
             <div class="row">
                {productList.filter((val) => {
                    if (searchword === "") {
                        return val;
                    } else if (val.name.toLowerCase().includes(searchword.toLowerCase()) || val.description.toLowerCase().includes(searchword.toLowerCase())){
                        return val;
                    }
                }).map((val) =>{
                    return <div class="col-4">
                    <a href={"/productdetails/"+val.pid}>
                        <img src = {val.picture} alt = ""></img>
                    </a>
                    <a href={"/productdetails/"+val.pid}>
                        <h4>{val.name}</h4>
                    </a>
                    <p>$ {(parseFloat(val.price*(100-val.discount_rate)/100).toFixed(2))}</p>
                    
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
             
             <div class="row">
</div>
             <div class="page-btn">
                 <span>1</span>
                 <span>2</span>
                 <span>3</span>
                 <span>4</span>
                 <span>&#8594;</span>
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
export default Products;