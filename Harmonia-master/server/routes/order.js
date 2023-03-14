const mysql = require('mysql');
const db = require("../index.js");




   
exports.giveOrder = function(req, res){
    const uid = req.body.uid; 
    const a = req.body.address;
    const products = req.body.products;
    const price = req.body.price;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

   
        db.query('INSERT INTO orders(uid, status, address, date, price) VALUES(?, "Processing", ?, ?, ?);', [uid, a, today, price],
        (err, result) => {
            if (err){
                console.log(err);
            }
            else{
                db.query('SELECT MAX(oid) as max_oid FROM orders;',
                (err2, result2) => {
                    console.log(result2);
                    console.log(result2[0].max_oid);
                    if(err2){
                        console.log(err2);
                    }
                    else{
                        products.map((p) => {
                        db.query('INSERT INTO order_attributes(oid, color, quantity, size, price, name, distributor, pid) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 
                        [result2[0].max_oid, p.color, p.quantity, p.size, parseFloat(p.price*(100-p.discount_rate)/100).toFixed(2), p.name, p.distributor, p.pid],
                        (err3, result3) => {
                            if(err3){
                                console.log(err3);
                            }
                            else{
                                db.query('UPDATE product_attributes SET stock = stock - ? WHERE paid = ?', [p.quantity, p.paid],
                                (err4, result4) => {
                                    if(err4){
                                        console.log(err4);
                                    }
                                    else{
                                        db.query('DELETE FROM basket WHERE bid = ?', uid, 
                                        (err5, result5) => {
                                            if(err5){
                                                console.log(err5);
                                            }
                                            //else{
                                                //console.log("Order has been created!");
                                                //res.json({message: "Order has been created!"});
                                            
                                            //}
                                        })
                                    }
                                })
                            }
                            
                        })
                    })
                    }
                })
            }
        })
    
    res.json({message: "Order has been created!"});
    console.log("Order has been created!");

};
exports.showOrders = function(req, res){
 
    let uid = req.query.uid;
    db.query('SELECT * FROM orders WHERE uid = ?', uid,
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

exports.showOrderAtts = function(req, res){
    const oid = req.body.oid;
    db.query('SELECT o.oaid, o.oid, o.color, o.quantity, o.size, o.price, o.name, o.distributor, o.pid, p.picture FROM order_attributes AS o, products AS p WHERE o.pid = p.pid;',   //warning: it does not return the atts of a spesicific order
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

exports.refund = function(req, res){
    const oid = req.body.oid;
    const text = req.body.text;
    db.query('UPDATE orders SET status = "Refund (Pending)", request = ? WHERE oid = ?', [text, oid],
    (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.json({message: "OK"});
        }
    })
};

exports.cancel = function(req, res){
    const oid = req.body.oid;
    db.query('DELETE FROM orders WHERE oid = ?', oid,
    (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            db.query('DELETE FROM order_attributes WHERE oid = ?', oid,
            (err2, result2) => {
                if(err2){
                    console.log(err2);
                }
                else{
                    res.json({message: "OK"});
                }
            })
        }
    })
};

exports.approve = function(req, res){
    const oid = req.body.oid;
    db.query('UPDATE orders SET status = "Refund (Approved)" WHERE oid = ?', oid,
    (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.json({message: "OK"});
        }
    })
};

exports.getInvoice = function(req, res){
 
    let oid = req.query.oid;
    db.query('SELECT * FROM orders O, order_attributes OA WHERE O.oid = ? AND O.oid = OA.oid', oid,
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

exports.getUserInfo = function(req, res){
 
    let oid = req.query.oid;
    db.query('SELECT uid FROM orders WHERE oid = ?', oid,
        (err, result) => {
            if (err){
                console.log(err);
            }
            else{
                db.query('SELECT * FROM users WHERE id = ?', result[0].uid,
                (err2, result2) => {
                    if(err){
                        console.log(err2);
                    }
                    else{
                        res.json({message: "OK", products: result2});
                    }
                })
            }
        })   
};
