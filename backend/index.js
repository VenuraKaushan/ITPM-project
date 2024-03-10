import express from 'express';
import "dotenv/config";
import cors from 'cors';
import dbConnect from './configs/dbConfig.js';

//initialized express
const app = express();

// SERVER PORT
const PORT = process.env.PORT || 6001;

// CORS [allow the pass the cookies to orin localhost]
app.use(cors({credentials : true,origin : 'http://localhost:5173'}));

// accept JSONS
app.use(express.json({limit : "100mb"}));

// config the urlEncoded middleware
app.use(express.urlencoded({extended : false}));


app.use((req,res,next)=>{
    console.log(`${req.method} =====> URL: ${req.url}`);
    next();
});

// root end point
app.get("/",(req,res)=>{
    res.send("Welcome to PMMS!"); 
});



app.listen(PORT,()=>{
    console.log(`🚀💀 Server is started on port ${PORT}!`);
    dbConnect();
});
