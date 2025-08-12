import express from 'express';
import mongoose from 'mongoose';
import auth from './middleware/auth'; 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import authRoutes from './routes/auth';
app.use('/auth',authRoutes);
app.use(auth);

import userRoutes from './routes/user';
app.use('/user',userRoutes);

mongoose.connect('mongodb://localhost:27017/')
    .then(()=>{
        app.listen(3000);
        console.log('app listing on port 3000');
    }).catch(err=>console.log(err));


