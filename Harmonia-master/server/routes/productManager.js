const mysql = require('mysql');
const db = require("../index.js");
var db_config = {
    user: "bF1lLNvvu0",
    host: "remotemysql.com",
    password: "meWSeVMzSQ",
    database: "bF1lLNvvu0"
};




exports.addProduct = function(req, res){
    const name = req.body.name;
    const desc = req.body.description;
    const price = req.body.price;
    const stock = req.body.stock;
    const size = req.body.size;
    const color = req.body.color;
    const distributor = req.body.distributor;
    const warranty = req.body.warranty;
    const pictureUrl = req.body.pictureUrl;
    db.query('INSERT INTO products(name, description, price, picture, rating, discount_rate) VALUES(?, ?, ?, ?, 0, 0);', 
    [name, desc, price, pictureUrl],
        (err, result) => {
            if (err){
                console.log(err);
            }
            else{
                db.query('SELECT MAX(pid) AS max_id FROM products;',
                    (err2, result2) => {
                        if(err2){
                            console.log(err2);
                        }
                        else{
                            db.query('INSERT INTO product_attributes(pid, color, stock, size, distributor, warranty) VALUES(?, ?, ?, ?, ?, ?);',
                            [result2[0].max_id, color, stock, size, distributor, warranty],
                            (err3, result3) => {
                                if(err3){
                                    console.log(err3);
                                }
                                else{
                                    res.json({message: "Product has been added!"});  
                                }
                            })
                        }
                    })
            }
        })
};

exports.showAllOrders = function(req, res){
 
    db.query('SELECT * FROM orders',
        (err, result) => {
            if (err){
                console.log(err);
            }
            else if(result.length > 0){
                res.json({message: "OK", products: result});
            }
            else{
                res.json({message: "NO"});
            }
        })
     
};
exports.showAllOrderAtts = function(req, res){
    db.query('SELECT o.oaid, o.oid, o.price, o.pid FROM order_attributes AS o, products AS p WHERE o.pid = p.pid;',   //warning: it does not return the atts of a spesicific order
        (err, result) => {
            if (err){
                console.log(err);
            }
            else if(result.length > 0){
                res.json({message: "OK", products: result});
            }
            else{
                res.json({message: "NO"});
            }
        })
};

exports.updateStatus = function(req, res){
    const oid = req.body.oid;
    const status = req.body.status;
    db.query('UPDATE orders SET status = ? WHERE oid = ?', [status, oid],
    (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.json({message: "OK"});
        }
    })
};