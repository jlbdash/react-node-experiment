import express from "express";
import cors from "cors";
import mysql from 'mysql';
import bodyParser from 'body-parser';

const port = 4000;

const app = express();

// cors is important for security reasons
app.use(cors());


var urlencodedParser = bodyParser.urlencoded({ extended: false });


// Database of Movies
var con = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "password"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("CREATE DATABASE if not exists mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});


// Table of Movies
var conn = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "password"
    database: "mydb"
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS movies (id INT(6) unsigned AUTO_INCREMENT PRIMARY KEY, name VARCHAR(60), genre VARCHAR(25), date INT(4) NOT NULL, rating DOUBLE(2,1) NOT NULL)";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});



// Create an endpoint called /read that responds with a list of movies
app.get("/read", (req, res) => {
    var sql = "SELECT * FROM movies";
    const list = conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Selected");
        res.send(result);
    });
});



// Create an endpoint called /update that responds with nothing but updates the entry
app.post("/update/", urlencodedParser, (req, res) => {
    var response = {
        id: req.body.id,
        name: req.body.name,
        genre: req.body.genre,
        date: req.body.date,
        rating: req.body.rating
    };

    var dbmovie = 'SELECT * FROM movies WHERE id = "' + response["id"] + '" ';

    conn.query(dbmovie, function (err, result) {
        if (response["name"] !== result[0]["name"]) {
            var sql = "UPDATE movies SET name =" + response["name"] + " WHERE id=" + response["id"];
            conn.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Name updated");
            });
        }
        if (response["genre"] !== result[0]["genre"]) {
            var sql = 'UPDATE movies SET genre =' + response["genre"] + ' WHERE id=' + response["id"];
            conn.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Genre updated");
            });
        }
        if (response["date"] !== result[0]["date"]) {
            var sql = 'UPDATE movies SET date =' + response["date"] + ' WHERE id=' + response["id"];
            conn.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Release date updated");
            });
        }
        if (response["rating"] !== result[0]["rating"]) {
            var sql = 'UPDATE movies SET rating =' + response["rating"] + ' WHERE id=' + response["id"];
            conn.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Record updated");
            });
        }
    }),
        res.redirect("http://localhost:3000/");
});



// Create an endpoint called /create that responds with nothing but updates the database
app.post("/create", urlencodedParser, (req, res) => {
    var response = {
        name: req.body.name,
        genre: req.body.genre,
        date: req.body.date,
        rating: req.body.rating
    };

    var sql = 'SELECT Count(*) FROM movies WHERE name = "' + response["name"] + '" ';

    function insert() {
        var sql2 = 'INSERT INTO movies (id, name, genre, date,rating) VALUES ("NULL","' + response["name"] + '","' + response["genre"] + '",' + response["date"] + ',' + response["rating"] + ')';

        conn.query(sql2, function (err, result) {
            if (err) throw err;
            else {
                console.log("Entry Created");
                res.redirect("http://localhost:3000/");
            }
        });
    };

    conn.query(sql, function (err, results) {
        if (results[0]["Count(*)"] != 0) {
            console.log(results[0]["Count(*)"] + "Already there");
        } else {

            console.log(results.affectedRows);
            insert();
        }
    });
});



// Create an endpoint called /movies/{ID} that deletes a movie entry
app.get("/delete/:id", (req, res) => {
    var sql = "DELETE FROM movies WHERE `id` = " + req.params.id;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Entry Deleted");
    });
});

app.listen(port, () =>
    console.log("Server is running on port 4000 and ready to accept requests!")
);
