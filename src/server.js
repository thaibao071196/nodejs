import express from "express";
import initApiRoute from "./routes/api";
import connectDB from "./config/connectDB";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

//connectdb
connectDB();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//init api route;
initApiRoute(app);

app.listen(port);
