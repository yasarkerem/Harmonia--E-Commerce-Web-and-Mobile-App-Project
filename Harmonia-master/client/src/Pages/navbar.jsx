import React, { useState, useEffect } from "react";
import Axios from 'axios';
import logo from '../images/logo.png'
import cart from '../images/cart.png'

const Navbar = () => {
   
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accountType, setType] = useState();
    const [notNum, setNot] = useState(0);
    const [cartNum, setCart] = useState(0);
    const [userId, setUserId] = useState();
    const [product, setProduct] = useState([]);
    const [nots, setNots] = useState([]);

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
  /*  useEffect(() => {
        Axios.get("http://localhost:3001/api/showcard", {
            params: {
                uid:userId
              }
        }).then((response)=>{
            if(response.data.message === "OK"){
                setProduct(response.data.products);
                
            }

            setCart(product.length);
        })
    });
    useEffect(() => {
        Axios.get("http://localhost:3001/api/shownotifications", {
            params: {
                uid: userId
              }
        }).then((response)=>{
            if(response.data.message === "OK"){
                setNots(response.data.products);
                
            }
            setNot(nots.length);
        })
    });
*/
   

  

   



    return(
        <div class="navbar">
                <div class="logo"> 
                     <img src={logo}  alt="Logo" ></img>
                </div>
                <nav>
                    <ul>
                    <li><a href="/" title="b1">Home</a></li>
                    <li><a href="/products" title="b2">Products</a></li>
                    {accountType==="product manager" &&
                    <li><a href="/comments">Edit Comments</a></li>
                    }
                    {accountType === "product manager" && 
                    <li><a href="/ordersProduct">Show Orders</a></li>
                    }
                    {accountType === "sales manager" && 
                    <li><a href="/showRequests">Show Requests</a></li>
                    }
                    {accountType === "sales manager" && 
                    <li><a href="/chart">Infographic</a></li>
                    }
                    {!isLoggedIn &&  
                    <li><a href="/login_register">Log In/Sign Up</a></li>
                    }
                    {isLoggedIn &&  
                    <li><a href={"/orders/"+userId}>Orders</a></li>
                    }
                    {isLoggedIn &&
                    <li><a href="/logout" title="b3">Log Out</a></li> 
                    }
                    
                    <li><a><div class="Hello"><li>Hello, {accountType}</li></div></a></li>

                    </ul>
                </nav>
                {isLoggedIn && 
                <a href={"/notif/"+userId}>
                <i class="fa fa-bell" ></i>
                {notNum!=0 &&
                <span class="badge1">{notNum}</span>
            }
                </a>}
                <a href={"/cart/"+userId}>
               
                <img src={cart}  alt="Cart" width="30px" height="30"></img>
                {cartNum !==0 &&
                <span class="badge2">{cartNum}</span>}
                </a>
            </div>




    )




}
export default Navbar;