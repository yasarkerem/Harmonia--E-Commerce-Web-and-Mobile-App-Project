import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import {useHistory, useParams} from 'react-router-dom'
import logo from '../images/logo.png'
import cart from '../images/cart.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import '../CSS/HomePage.css'
import profile from '../images/user-1.png'
import Navbar from './navbar'

function ProductDetails({match}){
    let history = useHistory();
    const [product, setProduct] = useState([]);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [distributor, setDistributor] = useState([]);
    const [stock, setStock] = useState([]);
    const [warrantyList, setWarrantyList] = useState([]);
    const [quantity, setQuantity] = useState();
    const [colorInfo, setColorInfo] = useState("");
    const [distributorInfo, setDistributorInfo] = useState("");
    const [sizeInfo, setSizeInfo] = useState("");
    const [stockInfo, setStockInfo] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProductManager, setIsProductManager] = useState(false);
    const [reviewList, setReviewList] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [discountInfo, setDiscountInfo] = useState(0);
    const [accountType, setType] = useState("Visitor");
    const [notNum, setNot] = useState(0);
    const [cartNum, setCart] = useState(0);
    const [userId, setUserId] = useState();
   

    Axios.defaults.withCredentials = true;

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
        Axios.get("http://localhost:3001/api/productdetails", {
            params: {
              pid: match.params.pid
            }
          }).then((response)=>{
            setProduct(response.data.products)
        })
    }, [])
    useEffect(() => {
        Axios.get("http://localhost:3001/api/productsize", {
            params: {
                pid: match.params.pid
              }
            }).then((response)=>{
              setSize(response.data.products)
          })
    }, [])
    useEffect(() => {
        Axios.get("http://localhost:3001/api/productcolor", {
            params: {
                pid: match.params.pid
              }
            }).then((response)=>{
              setColor(response.data.products)
          })
    }, [])
    useEffect(() => {
        Axios.get("http://localhost:3001/api/productdistributor", {
            params: {
                pid: match.params.pid
              }
            }).then((response)=>{
              setDistributor(response.data.products)
          })
    }, [])
    useEffect(()=> {
        Axios.get("http://localhost:3001/api/productstock", {
            params: {
                pid: match.params.pid 
            }
            }).then((response)=>{
                setStock(response.data.products);
                setWarrantyList(response.data.products);
          });
    }, [])

    useEffect(() => {
        Axios.get("http://localhost:3001/api/getReviews", {
            params: {
                pid: match.params.pid,
            },
            }).then((response)=>{
              setReviewList(response.data.reviews);
          })
    }, [])
    

    const removeProduct = (pid) => {
        Axios.delete(`http://localhost:3001/api/removeproduct/${pid}`).then((response) => {
            console.log(response.data.message);
        });
        history.push("/products");
    };

    const addReview = () => {
        Axios.post(`http://localhost:3001/api/addReview`, {
            uid: userId,
            pid: match.params.pid,
            comment: comment,
            rating: rating,
        }).then((response) => {
            console.log(response.data.message);
            alert(response.data.message);
        });
    };
        
    const setDiscount = (pid) => {
        Axios.post('http://localhost:3001/api/setdiscount', {
            pid: pid,
            discount: discountInfo
        }).then((response) => {
            console.log(response.data.message);
        });
        history.push("/productdetails/"+pid);
    };

    const editStock = (pid) => {
        Axios.put("http://localhost:3001/api/editstock", {
            pid: pid,
            color: colorInfo,
            size: sizeInfo,
            distributor: distributorInfo,
            stock: stockInfo
          }).then((response) => {
            console.log(response.data.message);
        });
        history.push("/productdetails/"+pid);   /*bu ne olmalı*/
    };

    const addToCard = (pid) => {
        Axios.post("http://localhost:3001/api/addtocard", {
            pid: pid,
            uid: userId,
            color: colorInfo,
            size: sizeInfo,
            distributor: distributorInfo,
            stock: stockInfo,
            quantity: quantity
          }).then((response) => {
            console.log(response.data.message);
            alert("Successfully Added to Cart");   //mertin kodunu buraya aldım(sor)
        });
        history.push("/productdetails/"+pid);   /*bu ne olmalı*/
    };
    var i, sum = 0;
    for(i = 0; i < stock.length; i++){
        if (stock[i].color.includes(colorInfo) && stock[i].distributor.includes(distributorInfo) && stock[i].size.includes(sizeInfo)){
            sum += stock[i].stock;
        }
    }
    var j, warranty = 0;
    for(j = 0; j < warrantyList.length; j++){
        if (stock[j].color.includes(colorInfo) && stock[j].distributor.includes(distributorInfo) && stock[j].size.includes(sizeInfo)){
            warranty = stock[j].warranty;
            break;
        }
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

         
        <div class="small-container single-product">
            <div class="row">
             
                {product.map((val) => {
                    return <div class = "row">
                        <div class = "col-2">
                        <img src={val.picture} alt="" width="100%"></img>
                        {isProductManager &&
                        <form>
                        <button type="button" class="btn" onClick ={()=> {removeProduct(val.pid)}}>Remove Product </button>
                        </form>
                        }
                        </div>
                        <div class="col-2">
                            <h1>{val.name}</h1>
                            {(val.discount_rate === 0) && 
                            <h4>${val.price}</h4>}
                            {(val.discount_rate !== 0) && 
                            <h4><small><strike style={{ color: 'red' }}>${val.price}</strike> ({val.discount_rate}%)</small><br></br> ${val.price*(100-val.discount_rate)/100}</h4>}  
                            <div class="stars">
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
                            <h6>Rating: {val.rating}</h6>

                            <select onChange = {(event) => {
                                setSizeInfo(event.target.value);
                            }}>
                                <option value = "">Select Size</option>
                                {size.map((v) => {
                                return <option>{v.size}</option>
                                })}
                            </select>
                            <select onChange = {(event) => {
                                setColorInfo(event.target.value);
                            }}>
                                <option value = "">Select Color</option>
                                {color.map((p) => {
                                return <option>{p.color}</option>
                                })}
                            </select>
                            <select onChange = {(event) => {
                                setDistributorInfo(event.target.value);
                            }}>
                                <option value = "">Select Distributor</option>
                                {distributor.map((d) => {
                                return <option>{d.distributor}</option>
                                })}
                            </select>
                            <br></br>
                            {sum !== 0 && <h3>Stock: {sum}</h3>}
                            {sum === 0 && <h3 style={{ color: 'red' }}>Out of stock!</h3>}
                            { sum > 0 && colorInfo !== "" && sizeInfo !== "" && distributorInfo !== "" &&
                            <div><input type="number" placeholder="0" min="0" onChange={(event) => {
                                setQuantity(event.target.value);
                                }}></input>{quantity <= sum && quantity >= 1 &&
                            <button type="button" class="btn" onClick ={()=> {addToCard(val.pid)}}>Add To Card</button>
                            }</div>}
                            {accountType=="product manager" && colorInfo !== "" && sizeInfo !== "" && distributorInfo !== "" &&
                            <form>
                            <h2>Stock: <input type="number" min="0" onChange={(event) => {
                            setStockInfo(event.target.value);
                            }}></input></h2> 
                            <button type="button" class="btn" onClick ={()=> {editStock(val.pid)}}>Edit Stock</button>
                            </form>
                            }
                            {accountType == "sales manager" && 
                            <form>
                            <h3>Discount Percentage: <input type="number" onChange={(event) => {
                            setDiscountInfo(event.target.value);}}></input></h3> 
                            <button type="button" class="btn" onClick ={()=> {setDiscount(val.pid)}}>Set Discount</button>
                            </form>
                            }
                            {/*<div class="successful">Succesfully Changed!</div>*/}
                            {distributorInfo !== "" &&
                            <div class="Warranty"><h5>Warranty: {warranty} year(s)</h5></div>}
                            <h3>Product Details <i class="fa fa-indent"></i></h3>
                            <p>{val.description}</p>
                            
                        </div></div>
                })}
            </div>
        </div>

        <div class="testimonial">
            <div class="small-container">
                <div class="row">
                {reviewList.map((val) => {
                    return <div class="col-3">
                        <i class="fa fa-quote-left"></i>
                        <p>{val.comment}</p>
                    
                        <div class="stars">
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
                        <img src={profile} alt=""></img>
                        <h3>{val.name}</h3>
                    </div>
                })}
                    {/*<div class="commentbutton1"><a href="" class="btn">&#8592; Previous</a></div>
                    <div class="commentbutton2"><a href="" class="btn" width="10000px">           Next &#8594;               </a></div>*/}
            </div>
          </div>  
         </div>

        {(accountType == "customer") &&
        <div class="addComment"><h4>Add a Comment</h4></div>
        }
        {(accountType == "customer") &&
        <div class="container-10">
            <div class="star-widget">
                <div class="starss">
                <input type="radio" name="rate" id="rate-5" value="5" onClick={() => {setRating(5);}}></input>
                <label for="rate-5" class="fa fa-star"></label>

                <input type="radio" name="rate" id="rate-4" value="4" onClick={() => {setRating(4);}}></input>
                <label for="rate-4" class="fa fa-star"></label>

                <input type="radio" name="rate" id="rate-3" value="3" onClick={() => {setRating(3);}}></input>
                <label for="rate-3" class="fa fa-star"></label>

                <input type="radio" name="rate" id="rate-2" value="2" onClick={() => {setRating(2);}}></input>
                <label for="rate-2" class="fa fa-star"></label>

                <input type="radio" name="rate" id="rate-1" value="1" onClick={() => {setRating(1);}}></input>
                <label for="rate-1 " class="fa fa-star"></label>
                </div>
                <form action="#">
                    
                    <div class="textarea">
                        <textarea cols="30" placeholder="Write your comment here.." 
                        onInput ={(event) => {setComment(event.target.value);}}></textarea>
                    </div>
                    <button type="button" class="btn" onClick = {() => {addReview()}}>Submit</button>
                </form>

            </div>
         </div>
        }







         
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