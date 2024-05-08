import express from 'express';
import "dotenv/config";
import cors from 'cors';
import dbConnect from './configs/dbConfig.js';
import StaffRoutes from './routes/staff.routes.js'
import StudentRoutes from './routes/student.routes.js'
import CoordinatorRoutes from './routes/coordinator.routes.js'
import PmemberRoutes from "./routes/pMember.routes.js"
import ExaminerRoutes from "./routes/examiner.routes.js"
import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
const writeFileAsync = promisify(fs.writeFile);

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

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage: storage });

// root end point
app.get("/",(req,res)=>{
    res.send("Welcome to PMMS!"); 
});

// redirect to staff routes
app.use('/staff',StaffRoutes);

// redirect to student routes
app.use('/student',StudentRoutes);

app.use('/coordinator',CoordinatorRoutes);

app.use('/pm',PmemberRoutes);

app.use('/examiner',ExaminerRoutes);

app.use('/api', upload.single('file'),StudentRoutes)
app.use('/apist', upload.single('image'),StudentRoutes)

app.use('/pmapi', upload.single('file'),PmemberRoutes)

app.listen(PORT,()=>{
    console.log(`🚀💀 Server is started on port ${PORT}!`);
    dbConnect();

});


