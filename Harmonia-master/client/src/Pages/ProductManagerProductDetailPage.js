import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import logo from '../images/logo.png'
import cart from '../images/cart.png'
import product1 from '../images/blank_png.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import '../CSS/HomePage.css'
import Axios from 'axios';
import Navbar from './navbar'

function Products(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accountType, setType] = useState("Visitor");

  

    Axios.defaults.withCredentials = true;

    let history = useHistory();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [distributor, setDistributor] = useState("");
    const [warranty, setWarranty] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [stock, setStock] = useState("");
    const [size, setSize] = useState("");
    const [message, setMessage] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [notNum, setNot] = useState(0);
    const [cartNum, setCart] = useState(0);
    const [isPicture, setIsPicture] = useState(false);
    
    const addProduct = () => {
        Axios.post('http://localhost:3001/productmanager/addproduct', {
          name: name,
          price: price, 
          distributor: distributor,
          warranty: warranty,
          description: description,
          color: color,
          stock:stock,
          size: size,
          pictureUrl: pictureUrl
        }).then((response) => {
          console.log(response.data.message);
          setMessage(response.data.message);
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

         
        <div class="small-container single-product">
            <div class="row">
            {!isPicture &&
                <div class="col-2">
                    
                    <img src={product1} alt="" width="100%"></img><h2>Picture url:<input class="AddProduct" type="text" onChange={(event) => {
                        setPictureUrl(event.target.value);
                    }}></input></h2>
                <div class="AddPhotoBtn"><button type="submit" class="btn" onClick = {setIsPicture(true)}>Add Photo </button></div>
                    
                    
                </div>
                
            }
            {isPicture &&
                <div class="col-2">
                    
                <img src={pictureUrl} alt="" width="100%"></img><h2>Picture url:<input class="AddProduct" type="text" onChange={(event) => {
                        setPictureUrl(event.target.value);
                    }}></input></h2>
                
                
            </div>
            }
                
                <div class="col-2">
                    <h2>Name:<input class="AddProduct" type="text" onChange={(event) => {
                        setName(event.target.value);
                    }}></input></h2>
                    <h2>Price:<input class="AddProduct" type="number" onChange={(event) => {
                        setPrice(event.target.value);
                    }}></input></h2>
                    <h2>Distributor:<input class="AddProduct" type="text" onChange={(event) => {
                        setDistributor(event.target.value);
                    }}></input></h2>
                    <h2>Warranty:<input class="AddProduct" type="number" onChange={(event) => {
                        setWarranty(event.target.value);
                    }}></input></h2>
                    <h2>Description:<input class="AddProduct" type="text" onChange={(event) => {
                        setDescription(event.target.value);
                    }}></input></h2>
                    <h2>Color:<input class="AddProduct" type="text" onChange={(event) => {
                        setColor(event.target.value);
                    }}></input></h2>
                    <select type = "number" onChange={(event) => {
                     setSize(event.target.value);
                     }}>
                        <option>Select Size</option>
                        <option>36</option>
                        <option>37</option>
                        <option>38</option>
                        <option>39</option>
                        <option>40</option>
                        <option>41</option>
                        <option>42</option>
                        <option>43</option>
                        <option>44</option>
                        <option>45</option>
                        <option>46</option>
                    </select>

                    <input type="number" placeholder="0" min="0" onChange={(event) => {
                        setStock(event.target.value);
                    }}></input>
                    { isPicture &&
                    <div>
                    <button type="submit" class="btn" onClick = {addProduct}>Add Product </button>
                    <div class="successful">{message}</div>
                    </div>
                    }
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
export default Products;