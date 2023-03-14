//IMPORTANT: searchwordü dışarı alıp ? ile yapmak gerekebilir.
const mysql = require('mysql');
const db = require("../index.js")
var db_config = {
    user: "bF1lLNvvu0",
    host: "remotemysql.com",
    password: "meWSeVMzSQ",
    database: "bF1lLNvvu0"
};



exports.productList = function(req, res){
    const sortby = req.body.sortby;
    const searchword = req.body.searchword;
    var mysql_statement = '';
    if(sortby == 'ascending_price'){
        if(typeof searchword !== 'undefined'){
            mysql_statement = 'SELECT * FROM products WHERE name LIKE '%searchword%' or description like '%searchword%' order by price;';
        }
        else{
            mysql_statement = 'SELECT * FROM products order by price;';  
        }
    }
    else if(typeof sortby == 'descending_price'){
        if(typeof searchword !== 'undefined'){
            mysql_statement = 'SELECT * FROM products WHERE name LIKE '%searchword%' or description like '%searchword%' order by price desc;';
        }
        else{
            mysql_statement = 'SELECT * FROM products order by price desc;';  
        }
    }
    else if(sortby == "most_popular"){
        if(typeof searchword !== 'undefined'){
            mysql_statement = 'SELECT * FROM products WHERE name LIKE '%searchword%' or description like '%searchword%' order by rating;';
        }
        else{
            mysql_statement = 'SELECT * FROM products order by rating desc;';  
        }
    }
    else if(typeof searchword !== 'undefined'){
        mysql_statement = 'SELECT * FROM products WHERE name LIKE '%searchword%' or description like '%searchword%''
    }
    else{
        mysql_statement = 'SELECT * FROM products;';  //limit has been set for the home page, remove it for the products page
    }
    db.query(mysql_statement,
        (err, result) => {
            if (err){
                console.log(err);
            }
            if(result.length > 0){
                res.json({message: "OK", products: result});
            }
            else{
                res.json("There are no products!");
            }
        }
        )
};

exports.featuredProducts = function(req, res){
    db.query('SELECT * FROM products order by rating desc LIMIT 4;',
        (err, result) => {
            if(err){
                console.log(err);
            }
            else if(result.length > 0){
                res.json({message: "OK", products: result});
            }
            else{
                res.json("No products!");
            }
        })
};

exports.latestProducts = function(req, res){
    db.query('SELECT * FROM products order by pid desc LIMIT 4;',
        (err, result) => {
            if(err){
                console.log(err);
            }
            else if(result.length > 0){
                res.json({message: "OK", products: result});
            }
            else{
                res.json("No products!");
            }
        })
};