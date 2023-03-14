const mysql = require('mysql');
const db = require("../index.js");
var db_config = {
    user: "bF1lLNvvu0",
    host: "remotemysql.com",
    password: "meWSeVMzSQ",
    database: "bF1lLNvvu0"
};


exports.product = function(req, res){
    
    let pid = req.query.pid
    db.query('SELECT * FROM products P WHERE P.pid = ?', [pid],
        (err, result) => {
            if (err){
                console.log(err);
            }
            else if(result.length > 0){
                res.json({message: "OK", products: result});
            }
            else{
                res.json("There are no products!");
            }
        })
      
};

exports.productSize = function(req, res){
   
    let pid = req.query.pid
    db.query('SELECT DISTINCT size FROM product_attributes Pa WHERE Pa.pid = ?', [pid],
        (err, result) => {
            if(err){
                console.log(err);
            }
            else if(result.length > 0){
                res.json({message: "OK", products: result});
            }
            else{
                res.json("Out of stock!");
            }
        })
      
};

exports.productColor = function(req, res){
   
    let pid = req.query.pid
    db.query('SELECT DISTINCT color FROM product_attributes Pa WHERE Pa.pid = ?', [pid],
        (err, result) => {
            if(err){
                console.log(err);
            }
            else if(result.length > 0){
                res.json({message: "OK", products: result});
            }
            else{
                res.json("No colors!");
            }
        })
  
};

exports.productDistributor = function(req, res){
    let pid = req.query.pid

    db.query('SELECT DISTINCT distributor, warranty FROM product_attributes Pa WHERE Pa.pid = ?', [pid],
        (err, result) => {
            if(err){
                console.log(err);
            }
            else if(result.length > 0){
                res.json({message: "OK", products: result});
            }
            else{
                res.json("No distributors!");
            }
        })

};

exports.productStock = function(req, res){
     
    let pid = req.query.pid;
    db.query('SELECT * FROM product_attributes Pa WHERE Pa.pid = ?', [pid],
        (err, result) => {
            if(err){
                console.log(err);
            }
            else if(result.length > 0){
                res.json({message: "OK", products: result});
            }
            else{
                res.json({Message: "Out of stock!"});
            }
        })
        
};

exports.editStock = function(req, res){
   
    const pid = req.body.pid;
    const s = req.body.size;
    const c = req.body.color;
    const d = req.body.distributor;
    const st = req.body.stock;
    db.query('UPDATE product_attributes SET stock = ? WHERE pid = ? AND size = ? AND color = ? AND distributor = ?', [st, pid, s, c, d],
        (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                console.log("Updated!");
            }
        })
       
};

exports.addToCard = function(req, res){

    const uid = req.body.uid;
    const pid = req.body.pid;
    const s = req.body.size;
    const c = req.body.color;
    const d = req.body.distributor;
    const st = req.body.stock;
    const q = req.body.quantity;
    console.log("addtocard", uid);
    db.query('SELECT paid FROM product_attributes WHERE pid = ? AND size = ? AND color = ? AND distributor = ?', [pid, s, c, d],
        (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                db.query('SELECT * FROM basket WHERE bid = ? AND paid = ?', [uid, result[0].paid],
                (err3, result3) => {
                    if(err3){
                        console.log(err3);
                    }
                    else if(result3.length > 0){  //if the product already exists in the card
                        db.query('UPDATE basket SET quantity = ? WHERE bid = ? AND paid = ?', [Number(result3[0].quantity)+Number(q), uid, result[0].paid],
                        (err4, result4) => {
                            if(err4){
                                console.log(err4);
                            }else{
                                res.json({message: "Product quantity has been updated!"});
                            }
                        })
                    }
                    else{
                        db.query('INSERT INTO basket(bid, paid, quantity) VALUES(?, ?, ?)', [uid, result[0].paid, q],
                        (err2, result2) => {
                            if(err2){
                                console.log(err2);
                            }
                            else{
                                res.json({message: "Product has been added to the card!"});
                            }
                        })
                    }
                })
            }
        })


};
exports.showCard = function(req, res){
    
    //const uid = req.body.uid;
    let uid = req.query.uid;
    db.query('SELECT * FROM basket B, products P, product_attributes Pa WHERE B.bid = ? AND Pa.paid = B.paid AND P.pid = Pa.pid;', [uid],
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

exports.removeProductFromCard = function(req, res){
   
    const uid = req.body.uid;
    const paid = req.body.paid;
    db.query('DELETE FROM basket WHERE paid = ? AND bid = ?', [paid, uid],
        (err, result) => {
            if (err){
                console.log(err);
            }
            else{
                console.log("deleted!") 
                res.json({message: "Product has been deleted!"});
            }
        }
    )

};

exports.setDiscount= function(req, res){
     
    const pid = req.body.pid;
    const d = req.body.discount;
    db.query('UPDATE products SET discount_rate = ? WHERE pid = ?', [d, pid],
        (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                db.query('SELECT * FROM products WHERE pid = ?', pid,
                (err2, result2) => {
                    if(err2){
                        console.log(err2);
                    }else{
                        var text = "There is a " + d.toString() + "% discount on " + result2[0].name +"!";
                        var i;
                        db.query('SELECT MAX(id) AS max_uid FROM users;',
                        (err3, result3) => {
                            if(err3){
                                console.log(err3);
                            }else{
                                for(i = 50; i <= result3[0].max_uid; i++)
                                db.query('INSERT INTO notifications(uid, text) VALUES(?, ?)', [i, text],
                                (err4, res4) => {
                                    if(err4){
                                        console.log(err4);
                                    }
                                })
                                res.json({message: "OK"});
                            }
                        })
                    }
                })
            }
        });
        
    

};

exports.showNotifications = function(req, res){
    let uid = req.query.uid;
    db.query('SELECT * FROM notifications WHERE uid = ?', uid,
    (err, result) => {
        if(err){
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

exports.removeNotification = function(req, res){
    const uid = req.body.uid;
    const nid = req.body.nid;
    db.query('DELETE FROM notifications WHERE nid = ? AND uid = ?', [nid, uid],
        (err, result) => {
            if (err){
                console.log(err);
            }
            else{
                res.json({message: "OK"});
            }
        }
    )
};
