import React, { useState, useEffect, Component } from 'react'
import Axios from 'axios';
import {useHistory, useParams} from 'react-router-dom'
import logo from '../images/logo.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import '../CSS/HomePage.css'
import "../CSS/Notification.css"
import Navbar from './navbar'
import {useRef} from 'react';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";


function Notifications({match}){

    const pdfExportComponent = useRef(null);

    const handleExportWithComponent = (event) => {
        pdfExportComponent.current.save();

    };

    const [list, setList] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/getinvoice", {
            params: {
                oid: match.params.oid
              }
        }).then((response)=>{
            if(response.data.message === "OK"){
                setList(response.data.products);
            }
        })
    });

    useEffect(() => {
        Axios.get("http://localhost:3001/api/getuserinfo", {
            params: {
                oid: match.params.oid
              }
        }).then((response)=>{
            if(response.data.message === "OK"){
                setUserInfo(response.data.products); 
            }
        })
    });

    var i, sum = 0;
    for (i = 0; i < list.length; i++) {
      sum += list[i].price * list[i].quantity;
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
            <script src="https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>


        </head>
        <body>

            
            <div class="container4">
            
            <Navbar/>    
            </div>


<div class="small-container notif-page" id="invoice">
    <PDFExport ref={pdfExportComponent} paperSize="A4">
    <div class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 padding">
     <div class="card">
         <div class="card-header p-4">
             <a class="pt-2 d-inline-block" href="index.html" data-abc="true">Hermonia.com</a>
             <div class="float-right">
                 <h3 class="mb-0">Invoice #BBB10234</h3>
             </div>
         </div>
         <div class="card-body">
             
             {userInfo.map((p) => {
                return <div class="row mb-4">
                    <div class="col-sm-6 ">
                     <h3 class="text-dark mb-1">{p.name}</h3>
                     <div>Email: {p.email}</div>
                 </div></div>})}
             <div class="table-responsive-sm">
                 <table class="table table-striped">
                     <thead>
                         <tr>
                             <th>Order ID</th>
                             <th>Date</th>
                             <th>Product ID</th>
                             <th>Product Name</th>
                             <th class="right">Price</th>
                             <th class="center">Quantity</th>
                             <th class="right">Total</th>
                         </tr>
                     </thead>
                     <tbody>
                     {list.map((l) => {
                        return <tr>
                             <td class="center">{l.oid}</td>
                             <td class ="center">{l.date}</td>
                             <td class="left">{l.pid}</td>
                             <td class="left">{l.name}</td>
                             <td class="right">${l.price}</td>
                             <td class="center">{l.quantity}</td>
                             <td class="right">${l.price*l.quantity}</td>
                         </tr>})}
                     </tbody>
                 </table>
             </div>
             <div class="row">
                 <div class="col-lg-4 col-sm-5">
                 </div>
                 <div class="col-lg-4 col-sm-5 ml-auto">
                     <table class="table table-clear">
                         <tbody>
                             <tr>
                                 <td class="left">
                                     <strong class="text-dark">Subtotal</strong>
                                 </td>
                                 <td class="right">${(parseFloat(sum).toFixed(2))}</td>
                             </tr>
                             <tr>
                                 <td class="left">
                                     <strong class="text-dark">VAT (8%)</strong>
                                 </td>
                                 <td class="right">${(parseFloat(sum*8/100).toFixed(2))}</td>
                             </tr>
                             <tr>
                                 <td class="left">
                                     <strong class="text-dark">Total</strong> </td>
                                 <td class="right">
                                     <strong class="text-dark">${(parseFloat(sum*108/100).toFixed(2))}</strong>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                 </div>
             </div>
         </div>
         <div class="card-footer bg-white">
             <p class="mb-0">Hermonia.com, Istanbul, Turkey</p>
         </div>
     </div>
 </div>
    </PDFExport>
    <button onClick={handleExportWithComponent}>Download</button>
    
   


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