var http = require('http');
var url = require('url');
var express = require('express');
var app = express();
var mysql = require('mysql');

var db_details = require('./db-details.js');


function createConnection() {
  return conn = mysql.createConnection({
    host: db_details.get_host(),
    port: db_details.get_port(),
    user: db_details.get_user(),
    password: db_details.get_passw(),
    database: db_details.get_db()
  });
}

function allowClientAccess(res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  return res;
}

app.get('/users', function(req, res) {
  var conn = createConnection();
  var sql = "SELECT * FROM Users";

  conn.query(sql, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }

    res = allowClientAccess(res);
    res.send(result);
    conn.end();
  });
});


app.get('/posts', function(req, res) {
  var conn = createConnection();
  var sql = "SELECT * FROM posts WHERE userId = " + req.query.userId;

  conn.query(sql, function(err, result) {
    if (err) {
      res.send('connection error');
      return;
    }

    res = allowClientAccess(res);
    res.send(result);
    conn.end();
  });
});

app.get('/comments', function(req, res) {
  var conn = createConnection();
  var sql = "SELECT * FROM comments WHERE postId = " + req.query.postId;

  conn.query(sql, function(err, result) {
    if (err) {
      res.send('connection error');
      return;
    }

    res = allowClientAccess(res);
    res.send(result);
    conn.end();
  });
});

app.get('/postUserId', function(req, res) {
  var conn = createConnection();
  var sql = "SELECT userId FROM posts WHERE id = " + req.query.postId;

  conn.query(sql, function(err, result) {
    if (err) {
      res.send('connection error');
      return;
    }

    res = allowClientAccess(res);
    res.send(result);
    conn.end();
  });
});


app.listen(8080, "0.0.0.0");
console.log('app listening at http://localhost:8080');
