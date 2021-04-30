//emasc 6
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose from "mongoose"; //bd

//routes
import router from './routes/index';

/*emasc 5
const express = require("express"),
  morgan = require("morgan"),
  cors = require("cors");*/

//connect to mongosDB
mongoose.Promise = global.Promise;
const dbURL = "mongodb://localhost:27017/mevn_db";
mongoose
  .connect(dbURL, { useCreateIndex: true, useNewUrlParser: true })
  .then((mongoose) => console.log("connecto to port 27017"))
  .catch((err) => console.log(err));

const app = express();

//middlewareaa
app.use(morgan("dev"));
app.use(cors());
//.middlewareaa

//to get json request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//.to get json request

//project public path
app.use(express.static(path.join(__dirname, "public")));
//.project public path

//api endpoints
app.use('/api', router);

//ports
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log("server working on port " + app.get("port"));
});
