import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import {useHistory, useParams} from 'react-router-dom'
import logo from '../images/logo.png'
import cart from '../images/cart.png'
import appstore from '../images/app-store.png'
import playstore from '../images/play-store.png'
import '../CSS/HomePage.css'
import Navbar from './navbar'
import Chart from "react-google-charts";



function Chart_myapp({match}){


    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [drawChart, setdrawChart] = useState(false);
    const [specialData, setSpecialData] = useState([]);
    const [list, setList] = useState([]);

    const showChart = () => {

        var year = startDate.substr(0,4);
        var month = startDate.substr(5,2);
        var day = startDate.substr(8,2);
        var start = day + "/" + month + "/" + year;

        year = endDate.substr(0,4);
        month = endDate.substr(5,2);
        day = endDate.substr(8,2);
        var end = day + "/" + month + "/" + year;

        Axios.post('http://localhost:3001/api/showChart', {
          startDate: start,
          endDate: end, 
        }).then((response) => {
            if (response.data.message == "OK")
            {
                console.log(response.data.message);
                setdrawChart(true);
                setSpecialData(revenueCalculator(response.data.chartData));
                setList(response.data.chartData);
            }
            else
            {

            }
        });
    };

    const revenueCalculator = (chartData) => {
        var specialData = [[
            { type: 'date', label: 'Day' },
            'Total amount',
          ]]
        var prevDate = chartData[0].date;
        var sum = chartData[0].price;
        var intDay;
        var intMonth;
        var intYear;
        var i;
        for (i = 1; i < chartData.length; i++)
        {
            if (chartData[i].date === prevDate)
            {
                sum+= chartData[i].price;
            }
            else
            {
                intDay = parseInt(prevDate.substr(0,2), 10);
                intMonth = parseInt(prevDate.substr(3,2), 10);
                intYear = parseInt(prevDate.substr(6,4), 10);

                specialData.push([new Date(intYear, intMonth, intDay), sum]);

                prevDate = chartData[i].date;
                sum = chartData[i].price;
            }
        }
        intDay = parseInt(prevDate.substr(0,2), 10);
        intMonth = parseInt(prevDate.substr(3,2), 10);
        intYear = parseInt(prevDate.substr(6,4), 10);

        specialData.push([new Date(intYear, intMonth, intDay), sum]);
        return specialData;
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
            


        <div class="small-container">
            
            <div class="chartInput">
                <h2>Date</h2>
                <input type="date" onChange={(event) => {
                        setStartDate(event.target.value);
                    }}></input>
                <div class="divider"></div>
                <input type="date" onChange={(event) => {
                        setEndDate(event.target.value);
                    }}></input>
                <button type="button" class="btn" onClick = {showChart}>Search</button>
            
            </div>
        </div>
        
        <div class="small-container cart-page">
        <table class="Table2">
            <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Invoice</th>
                <th>          </th>
            </tr>
            {list.map((p) => {
            return <tr>
                <td>{p.oid}</td>
                <td>{p.date}</td>
                <td><a href={"/invoice/"+p.oid} class="fa fa-file-pdf-o"></a></td>
            </tr>})}
        </table></div>
        <div class="google">
        {drawChart &&
        <div>
            <Chart
            width={'600px'}
            height={'400px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={specialData}
            options={{
                hAxis: {
                title: 'Time',
                },
                vAxis: {
                title: 'Price',
                },
            }}
            rootProps={{ 'data-testid': '1' }}
            />

        </div>
        
        
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
export default Chart_myapp;
