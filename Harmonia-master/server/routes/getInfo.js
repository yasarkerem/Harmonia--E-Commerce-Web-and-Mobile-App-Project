// SU AN KULLANILMIYOR

const mysql = require('mysql');
/*const db = mysql.createConnection({
    user: "bF1lLNvvu0",
    host: "remotemysql.com",
    password: "meWSeVMzSQ",
    database: "bF1lLNvvu0"
});*/

const db = require("../index.js");

exports.getUsername = function(req, res){
    const id = req.body.id;

    db.query('SELECT name FROM users WHERE id = ?', id,    
        (err, result) => {
            if(err){
                console.log(err);
                res.json({message: "Unexpected error."});
            }
            if(result.length > 0){
                res.json({message: "OK", name: result});
            }
            else{
                console.log("There is no such email!");
                res.json({message: "There is no user with this id."})
            }
        }
    )
};