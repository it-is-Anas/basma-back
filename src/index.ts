import express from 'express';
import mongoose from 'mongoose';
import auth from './middleware/auth'; 
import multer from 'multer';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer();
app.use(upload.none());


import authRoutes from './routes/auth';
app.use('/auth',authRoutes);

import userRoutes from './routes/user';
app.use('/user', auth ,userRoutes);

mongoose.connect('mongodb://localhost:27017/')
    .then(()=>{
        app.listen(3000);
        console.log('app listing on port 3000');
    }).catch(err=>console.log(err));


