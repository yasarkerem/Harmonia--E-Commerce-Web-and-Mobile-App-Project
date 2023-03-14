import "./App.css";
import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from "./Pages/Home";

import PageNotFound from "./Pages/PageNotFound";
import Products from "./Pages/Products";
import Account from "./Pages/Account";
import LogOut from "./Pages/logout"
import ProductsDetail from "./Pages/ProductsDetail";
import ProductManagerProductDetailPage from "./Pages/ProductManagerProductDetailPage";
import cart from "./Pages/cart";
import comments from "./Pages/comments";
import Notifications from "./Pages/Notification";
import orders from "./Pages/orders";
import ordersProduct from "./Pages/ordersProduct";
import Chart_myapp from "./Pages/chart";
import invoice from "./Pages/invoice";
import chart from "./Pages/chart";


import salesManager from "./Pages/salesManager";


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login_register" exact component={Account}/>
                <Route path="/logout" exact component = {LogOut}/>                
                <Route path="/products" exact component = {Products}/>  
                <Route path="/productdetails/:pid" component = {ProductsDetail}/>                
                <Route path="/productsDetailManager" exact component = {ProductManagerProductDetailPage}/>
                <Route path="/ordersProduct" exact component = {ordersProduct}/> 
                <Route path="/cart/:uid" exact component = {cart}/>
                <Route path="/comments" exact component = {comments}/> 
                <Route path="/invoice/:oid" exact component = {invoice}/> 
                <Route path="/notif/:uid" exact component = {Notifications}/>
                <Route path="/chart" exact component = {Chart_myapp}/>
                <Route path="/orders/:uid" exact component = {orders}/>  
                <Route path="/showRequests" exact component = {salesManager}/> 
                
                
                <Route path="*" exact component = {PageNotFound}/>
               
            </Switch>
        </Router>
    );
}

export default App;
