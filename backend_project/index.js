import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
const PORT = 8080
const app = express();
dotenv.config({});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.listen(PORT , ()=>{
    connectDB();
    console.log(`server running at ${PORT}`);
})