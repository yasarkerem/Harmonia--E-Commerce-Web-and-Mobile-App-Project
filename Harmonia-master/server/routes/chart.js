const mysql = require('mysql');
const db = require("../index.js");
var db_config = {
    user: "bF1lLNvvu0",
    host: "remotemysql.com",
    password: "meWSeVMzSQ",
    database: "bF1lLNvvu0"
};


exports.showChart = function(req, res){
    
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    db.query('SELECT * FROM orders WHERE date >= ? AND date <= ?', [startDate, endDate],
        (err, result) => {
            if (err){
                console.log(err);
            }
            else if(result.length > 0){
                res.json({message: "OK", chartData: result});
            }
            else{
                res.json({message: "No orders between these dates!"});
            }
        })
      
};