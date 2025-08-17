import { body, validationResult } from "express-validator";
import type { Request ,Response ,NextFunction} from "express";
import bcrypt from 'bcrypt';
import { bcryptConfig } from "../config/config";
import User from "../model/User";
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/config';

export const signUp = async (req: Request,res: Response,next: NextFunction)=>{
    const { first_name , last_name , email , password } = req.body;
    try{
        const checkUser = await User.findOne({email:email});
        if(checkUser){
            throw new Error('email is already token');
        }
    }catch(err){
        return next(err);
    }
    let hashedPassword:string = '';
    try{
        const hp = await bcrypt.hash(password,bcryptConfig.saltyHash);
        hashedPassword = hp;
    }catch(err){
        return next(err);
    };
    let user;
    try{
        user = await User.create({
            firstName: first_name,
            lastName: last_name,
            email,
            password: hashedPassword,
            img: '',
        });
    }catch(err){
        return next(err);
    };
    let accessToken: string= '';
    if(user){
        accessToken = jwt.sign({_id:user._id ,email: user.email,},jwtConfig.secertKey,);
    }
    res.json({data: user,msg:'welcome !',token: accessToken});

};


export const logIn = async(req: Request,res: Response,next: NextFunction)=>{
    const {email , password } = req.body;
    let user ;
    try{
        user = await User.findOne({email:email});
    }catch(err){
        return next(err);
    }
    if(!user){
        throw new Error('Email or password not match');
    }
    if(user){
        let check ;
        try{
            check = await bcrypt.compare(password,user?.password);
        }catch(err){
            return next(err);
        }
        if(check){
            let accessToken: string= '';
            accessToken = jwt.sign({_id:user._id ,email: user.email,},jwtConfig.secertKey,);
            res.json({data: user,msg:'welcome !',token: accessToken});
        }else{
            throw new Error('Email or password not match');
        }
    }

};

export const getAllUsers = async (req: Request,res: Response,next: NextFunction)=>{
    try{
        const users = await User.find();
        res.json({msg: '',users});
    }catch(err){
        return next(err);
    };
};

export const getProfile = async (req: Request,res: Response,next: NextFunction)=>{
    
};
