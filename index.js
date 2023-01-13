"use strict";
//database connection using ts
exports.__esModule = true;
//importing dependencies/middleware needed and the types for ts
var express_1 = require("express");
var mysql_1 = require("mysql");
var app = (0, express_1["default"])();
app.use(express_1["default"].json()); //parsing incoming json requests
var port = 5000; //calling port 
//creating that connection to the mysql database
var connection = mysql_1["default"].createConnection({
    host: '127.0.0.1',
    user: 'devuser',
    password: 'Josefinaflores73',
    database: 'dummydb'
});
//grabbing the query from the database 
//will throw an error if it doesnt 
app.get('/', function (req, res) {
    connection.query('SELECT * FROM products', req.body, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).end();
            return;
        }
        res.status(200).json(result).end();
    });
});
//listening on the port 5000
app.listen(port, function () {
    console.log("Listening on port ".concat(port));
});
//CRUD
//not sure if this was part of the challenge but it was 
//good practice with postman as well
//Create portion of crud
//added dummy data 
app.post('/', function (req, res) {
    connection.query("INSERT INTO products SET ?", req.body, function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        req.body.id = result.insertId;
        res.status(200).json(req.body).end();
    });
});
//Read portion of crud
//based on the id i just want to get the info
app.get('/:id', function (req, res) {
    connection.query("SELECT * FROM products WHERE id = ?", [req.params.id], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        res.status(200).json(result).end();
    });
});
//Update portion of crud
//i just wanted to update the products table name,price,and genre using a specifc id
app.put('/:id', function (req, res) {
    req.body.id = Number(req.params.id);
    connection.query("UPDATE products SET name = ?, price = ?, genre = ? WHERE id = ?", [req.body.name, req.body.price, req.body.genre, req.body.id], function (err) {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        res.status(200).json(req.body).end();
    });
});
//Delete portion of crud
//from the dummy data that was created(id:16 ) 
//i delete it doing a delete request and using the id
app["delete"]('/:id', function (req, res) {
    connection.query('DELETE FROM products WHERE id = ?', [req.params.id], function (err) {
        if (err) {
            console.log(err);
            res.status(500).end();
            return;
        }
        res.status(200).end();
    });
});
