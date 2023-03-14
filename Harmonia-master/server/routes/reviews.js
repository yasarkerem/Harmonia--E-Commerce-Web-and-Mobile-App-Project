const mysql = require('mysql');
/*const db = mysql.createConnection({
    user: "bF1lLNvvu0",
    host: "remotemysql.com",
    password: "meWSeVMzSQ",
    database: "bF1lLNvvu0"
});*/
const db = require("../index.js");

exports.getReviews = function(req, res){
    let pid = req.query.pid;

    db.query('SELECT u.name, r.comment, r.rating, r.approved FROM users AS u, reviews AS r WHERE r.approved = 1 AND r.pid = ? AND u.id = r.uid', pid,    
        (err, result) => {
            if(err){
                console.log(err);
                res.json({message: "Unexpected error."});
            }
            if(result.length > 0){
                res.json({message: "OK", reviews: result}); 
            }
            else{
                res.json({message: "OK", reviews: []});
            }
        }
    )
};

exports.getPendingReviews = function(req, res){

    db.query('SELECT p.name AS productname, p.picture, r.pid, r.cid, p.price, u.name, r.comment, r.rating, r.approved FROM users AS u, reviews AS r, products AS p WHERE r.approved = 0 AND u.id = r.uid AND p.pid = r.pid',   
        (err, result) => {
            if(err){
                console.log(err);
                res.json({message: "Unexpected error."});
            }
            if(result.length > 0){
                res.json({message: "OK", reviews: result}); 
            }
            else{
                res.json({message: "OK", reviews: []});
            }
        }
    )
};

exports.addReview = function(req, res){
    const uid = req.body.uid
    const pid = req.body.pid;
    const comment = req.body.comment
    const rating = req.body.rating

    db.query('SELECT uid from reviews WHERE uid = ? AND pid = ?', [uid, pid],
        (err, result) => {
            if (err){
                console.log(err);
                res.json({message:'Unexpected error.'});
            }
            if(result.length > 0){
                console.log("You have already reviewed this product!")  //it should be res.send
                res.json({message:'You have already reviewed this product!'});
            }
            else
            {
                db.query('INSERT INTO reviews (uid, pid, comment, rating, approved) VALUES (?,?,?,?,?)', 
                [uid, pid, comment, rating, 0],  
                    (err, result) => {
                        if(err){
                            console.log(err);
                            res.json({message: "Unexpected error."});
                        }
                        else{
                            console.log("Review submitted.")
                            res.json({message: "Your review is submitted, pending for manager approval."})
                        }
                    }
                )   
            }
    })
};

exports.approveReview = function(req, res){
    const cid = req.body.cid;
    const pid = req.body.pid;;

    db.query('UPDATE reviews SET approved = 1 WHERE cid = ?', [cid],   
        (err, result) => {
            if(err){
                console.log(err);
                res.json({message: "Unexpected error."});
            }
            else{
                console.log("Review approved.")
                db.query('SELECT AVG(rating) as avg_rating FROM reviews WHERE approved = 1 AND pid = ?',
                [pid],
                (err, result3) => {
                    if (err){
                        console.log(err);
                        res.json({message: "Unexpected error."});
                    }
                    else{
                        db.query('UPDATE products SET rating = ? WHERE pid = ?',
                        [result3[0].avg_rating, pid],
                        (err, result4) => {
                            if (err){
                                console.log(err);
                                res.json({message: "Unexpected error."});
                            }
                            else{
                                console.log("Product rating updated.");
                                res.json({message: "Review approved."});
                            }
                        }
                        )
                    }
                }
                )
            }
        }
    )
};

exports.removeReview = function(req, res){
    const cid = req.params.cid
    db.query('DELETE FROM reviews WHERE cid = ?', [cid],   
        (err, result) => {
            if(err){
                console.log(err);
                res.json({message: "Unexpected error."});
            }
            else{
                console.log("Review removed.")
                res.json({message: "Review removed."});
            }
        }
    )
};