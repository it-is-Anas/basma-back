import express from 'express';
import mongoose from 'mongoose';
import auth from './middleware/auth'; 
import path from 'path';
import { Req } from './types';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import labelRoutes from './routes/label';
import taskRoutes from './routes/task';
import projectRoutes from './routes/project';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/auth',authRoutes);
app.use('/user', auth ,userRoutes);
app.use('/label',auth,labelRoutes);
app.use('/task',auth,taskRoutes);
app.use('/project',auth,projectRoutes);


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
    
    // Handle label-related errors
    if (error instanceof Error && (
        error.message === 'label is all ready exist' ||
        error.message === 'No label with this id' ||
        error.message === 'You can update this label' ||
        error.message === 'This label is already exist !' ||
        error.message === 'Same label don\'t need to update !'
    )) {
        return res.status(400).json({
            msg: error.message
        });
    }
    
    // Handle project-related errors
    if (error instanceof Error && (
        error.message === 'You don\'t have project with this id !' ||
        error.message === 'No Project matched with id !' ||
        error.message === 'You can\'t add task to this project !'
    )) {
        return res.status(400).json({
            msg: error.message
        });
    }
    
    // Handle task-related errors
    if (error instanceof Error && (
        error.message === 'No label found with this label id' ||
        error.message === 'You don\'t have task with this id !'
    )) {
        return res.status(400).json({
            msg: error.message
        });
    }
    
    // Handle auth-related errors
    if (error instanceof Error && (
        error.message === 'email is already token' ||
        error.message === 'Email or password not match'
    )) {
        return res.status(400).json({
            msg: error.message
        });
    }

    if(error instanceof Error && (error.message)){
        return res.status(400).json({
            msg: error.message
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


