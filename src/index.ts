import express from 'express';
import mongoose from 'mongoose';
import auth from './middleware/auth'; 
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

import authRoutes from './routes/auth';
app.use('/auth',authRoutes);

import userRoutes from './routes/user';
app.use('/user', auth ,userRoutes);

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Handle image-related errors
    if (error instanceof Error && (
        error.message === 'Only image files are allowed!' ||
        error.message === 'Image files are not allowed!' ||
        error.message.includes('File type') ||
        error.message.includes('File extension')
    )) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'File size too large. Maximum size is 5MB.'
        });
    }
    
    console.error('Error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

mongoose.connect('mongodb://localhost:27017/')
    .then(()=>{
        app.listen(3000);
        console.log('app listing on port 3000');
    }).catch(err=>console.log(err));


