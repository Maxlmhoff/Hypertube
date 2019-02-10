var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root42"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS hypertube", (err) => { if (err) throw err;});
    con.query('USE `hypertube`', (err)=>  { if (err) throw err });
  
    var sql = "CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY AUTO_INCREMENT,login VARCHAR(255), name VARCHAR(255), firstname VARCHAR(255), email VARCHAR(255), password VARCHAR(5000), img VARCHAR(255))"
    con.query(sql, function (err, result) { if (err) throw err; console.log("Table users created"); });

    var sql2 = "CREATE TABLE IF NOT EXISTS comment(id INT PRIMARY KEY AUTO_INCREMENT,login VARCHAR(255), userId VARCHAR(255), movieId VARCHAR(255), comment TEXT)"
    con.query(sql2, function (err, result) { if (err) throw err; console.log("Table comment created"); });

    var sql3 = "CREATE TABLE IF NOT EXISTS vues (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, movie_id INT)";
    con.query(sql3, (err) => { if (err) throw err; console.log("Table vues created"); });

  });
  
  module.exports = con;
