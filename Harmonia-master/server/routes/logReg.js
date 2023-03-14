const mysql = require('mysql');
const db = require("../index.js");
var db_config = {
    user: "bF1lLNvvu0",
    host: "remotemysql.com",
    password: "meWSeVMzSQ",
    database: "bF1lLNvvu0"
};

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = function(req, res){
    const name = req.body.fullname
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    const type = req.body.types;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query('SELECT email from users WHERE email = ?', [email],
        (err, result) => {
            if (err){
                console.log(err);
                res.json({message:'Unexpected error.'});
            }
            if(result.length > 0){
                console.log("That email is already in use.")  //it should be res.send
                res.json({message:'That email is already in use.'});
            }
            else if(password != confirmpassword){
                console.log("Passwords do not match!");  //it should be res.send
                res.json({message:"Passwords do not match!"});
            }
            else{
                db.query(
                    'INSERT INTO users (email, password, name, type) VALUES (?,?,?,?)', 
                    [email, hash, name, type],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            //console.log("Values Inserted.");  //it should direct the user to the home/login page
                            db.query('SELECT * FROM basket WHERE bid = 53', 
                            (err2, result2) => {
                                if(err2){
                                    console.log(err2);
                                }else if (result2.length > 0){
                                    db.query('SELECT MAX(id) AS max_id FROM users',
                                        (err3, result3) => {
                                            if(err3){
                                                console.log(err3);
                                            }else{
                                                db.query('UPDATE basket SET bid = ? WHERE bid = 53;', result3[0].max_id,
                                                (err4, result4) => {
                                                    if(err4){
                                                        console.log(err4);
                                                    }
                                                })
                                            }
                                        })
                                }
                            })
                        }
                    }
                );
                res.json({message:"Succesfully registered!"});
            }
        })
    })
};

exports.login = function(req, res){
   
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    db.query('SELECT * FROM users WHERE email = ?', email,    
        (err, result) => {
            if(err){
                console.log(err);
                res.json({message: "Unexpected error."});
            }
            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response){
                        if (result[0].type == "product manager")
                        {
                            req.session.usertype = "product manager";
                        }
                        else if (result[0].type == "sales manager")
                        {
                            req.session.usertype = "sales manager";
                        }
                        else
                        {
                            req.session.usertype = "customer";
                        }
                        req.session.user = result;
                        //console.log(req.session.user[0].id);
                        db.query('SELECT * FROM basket WHERE bid = 53', 
                            (err2, result2) => {
                                if(err2){
                                    console.log(err2);
                                }else if (result2.length > 0){
                                    db.query('UPDATE basket SET bid = ? WHERE bid = 53;', result[0].id,
                                    (err4, result4) => {
                                        if(err4){
                                            console.log(err4);
                                        }
                                    })
                                            
                                }
                            })
                        console.log("Successful Login!");
                        
                        res.json({message: "OK", user: result});
                    }
                    else{
                        console.log("Incorrect password!");
                        res.json({message:"Incorrect password!"});
                    }
                })   
            }
            else{
                console.log("There is no such email!");
                res.json({message: "There is no such email!"})
            }
        }
    )

};