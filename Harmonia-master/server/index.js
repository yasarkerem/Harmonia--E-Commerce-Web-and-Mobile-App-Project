const express = require("express");
const app = express();
const cors = require('cors');

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));

//new

app.use(session({
    key: "userID",
    secret: 'cs310group10',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000,
    }
}));

const mysql = require('mysql');
/*var db = mysql.createPool({
    connectionLimit: 15,
    queueLimit: 10,
    user: "bF1lLNvvu0",
    host: "remotemysql.com",
    password: "meWSeVMzSQ",
    database: "bF1lLNvvu0"
});*/
//const db = connection.getConnection();
var db_config = {

    user: "bF1lLNvvu0",
    host: "remotemysql.com",
    password: "meWSeVMzSQ",
    database: "bF1lLNvvu0",
    multipleStatements: true,
    connectionLimit: 9,
};

var db = mysql.createPool(db_config);
module.exports = db;





// .js files includes
const products = require('./routes/products.js');
const logReg = require('./routes/logReg.js');
const productDetails = require('./routes/productDetails.js');
const productManager = require('./routes/productManager.js');
const reviews = require('./routes/reviews.js');
// const getInfo = require('./routes/getInfo.js');
const giveOrder = require('./routes/order.js');
const chart = require('./routes/chart.js');

module.exports = app;

// products.js
app.get('/api/products', products.productList);
app.get('/api/featuredproducts', products.featuredProducts);
app.get('/api/latestproducts', products.latestProducts);

//productDetails.js
app.get("/api/productdetails", productDetails.product);
app.get("/api/productsize", productDetails.productSize);
app.get("/api/productcolor", productDetails.productColor);
app.get("/api/productdistributor", productDetails.productDistributor);
app.get("/api/productstock", productDetails.productStock);
app.put("/api/editstock", productDetails.editStock);
app.post("/api/addtocard", productDetails.addToCard);
app.get("/api/showcard", productDetails.showCard);
app.put("/api/removeproductfromcard", productDetails.removeProductFromCard);
app.post("/api/setdiscount", productDetails.setDiscount);
app.get("/api/shownotifications", productDetails.showNotifications);
app.put("/api/removenotification", productDetails.removeNotification);

//review.js
app.get("/api/getReviews", reviews.getReviews);
app.get("/api/getPendingReviews", reviews.getPendingReviews);
app.post("/api/addReview", reviews.addReview);
app.put("/api/approveReview", reviews.approveReview);
app.delete("/api/removeReview/:cid", reviews.removeReview);

//getInfo.js
//app.post("/api/getUsername", getInfo.getUsername);

app.delete("/api/removeproduct/:pid", (req, res) => {
    const pid = req.params.pid;
    db.query('DELETE FROM products WHERE pid = ? ', pid,
        (err, result) => {  
            if (err){
                console.log(err);
            }
            else{
                res.json({message: "Product has been deleted!"});
            }
        })
});

//productManager.js
app.post("/productmanager/addproduct", productManager.addProduct);
app.post("/api/updatestatus", productManager.updateStatus);
app.get("/api/showallorders", productManager.showAllOrders);
app.get("/api/showallorderatts", productManager.showAllOrderAtts);

// logReg.js
app.post('/register', logReg.register);
app.post('/login', logReg.login);

//new stuff
app.get('/login', (req, res)=> {
    if (req.session.user != null) {
        res.send({loggedIn : true, user: req.session.user, type: req.session.usertype});
    }
    else
    {
        res.send({loggedIn : false});
    }
    
});

//order.js
app.post('/api/giveorder', giveOrder.giveOrder);
app.get("/api/showorders", giveOrder.showOrders);
app.post("/api/showorderatts", giveOrder.showOrderAtts);
app.post("/api/refund", giveOrder.refund);
app.post("/api/cancel", giveOrder.cancel);
app.post("/api/approve", giveOrder.approve);
app.get("/api/getinvoice", giveOrder.getInvoice);
app.get("/api/getuserinfo", giveOrder.getUserInfo);

app.get('/logout', (req, res)=>{
    req.session.user = null;
    res.send({status: "Logged out successfully."});
});

//chart.js
app.post('/api/showChart', chart.showChart);

app.listen(3001, () => {
    console.log("Connected to the server. Yeeeyy!");  
});
