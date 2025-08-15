import express from 'express';
import mongoose from 'mongoose';
import auth from './middleware/auth'; 
import path from 'path';
import { Req } from './types';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import labelRoutes from './routes/label';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/auth',authRoutes);

app.use('/user', auth ,userRoutes);

app.use('/label',auth,labelRoutes);

app.use((error: any, req: Req, res: express.Response, next: express.NextFunction) => {
    if (error instanceof Error && (
        error.message === 'Only image files are allowed!' ||
        error.message === 'Image files are not allowed!' ||
        error.message.includes('File type') ||
        error.message.includes('File extension')
    )) {
        return res.status(400).json({
            msg: error.message
        });
    }
    
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            msg: 'File size too large. Maximum size is 5MB.'
        });
    }
    
    console.error('Error:', error);
    res.status(500).json({
        msg: 'Internal server error'
    });
});



mongoose.connect('mongodb://localhost:27017/')
    .then(()=>{
        app.listen(3000);
        console.log('app listing','http://localhost:3000');
    }).catch(err=>console.log(err));


