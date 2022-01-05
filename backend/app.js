const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const FileStore = require("session-file-store")(session);
const publicPath = path.join(__dirname, "/public");
require("./db");
const userRoutes = require('./router/userRouter');
const tokenRoutes = require('./router/tokenRouter')
const fs = require('fs')

// app.set('view engine', 'pug');
// app.set('views','./public/views');
const oneDay = 1000 * 60 * 60 * 24;
app.use(express.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(
  session({
    name: "SESSIONID",
    secret: "SECRET KEY",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    store: new FileStore({ path: path.join(__dirname, "/session") }),
    genid: function (req) {
      return uuidv4();
    },
  })
);
app.use(express.static(publicPath));
app.use(userRoutes);
app.use(tokenRoutes);

const AWS = require('aws-sdk');
AWS.config.loadFromPath('./aws_config.json');

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});

var params = {
  Bucket: "staff-management", 
  Key: "avatar/pier.jpg"
 };

s3.getObject(params, function(err, data) {
  if (err)
    console.log(err, err.stack);
  else
  {
    const buf = Buffer.from(data.Body);
  }
 });

module.exports = app;
