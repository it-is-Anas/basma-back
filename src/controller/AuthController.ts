import { body, validationResult } from "express-validator";
import type { Request ,Response ,NextFunction} from "express";
import bcrypt from 'bcrypt';
import { bcryptConfig } from "../config";
import User from "../model/User";
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config';

export const signUp = async (req: Request,res: Response,next: NextFunction)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(421).json({msg:'Error Validation',filed: errors['errors'][0]['path'],error_msg: errors['errors'][0]['msg']});
        }
    const { first_name , last_name , email , password } = req.body;
    try{
        const checkUser = await User.findOne({email:email});
        if(checkUser){
            return res.status(422).json({msg:'email is already token',filed:'email',error_msg: 'email should be unique'});
        }
    }catch(err){
        console.log(err);
    }
    let hashedPassword:string = '';
    try{
        const hp = await bcrypt.hash(password,bcryptConfig.saltyHash);
        hashedPassword = hp;
    }catch(err){
        res.status(400).json({msg: 'somthing went wrong '});
        console.log(err);
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
        res.status(400).json({msg: 'somthing went wrong '});
        console.log(err);
    };
    let accessToken: string= '';
    if(user){
        accessToken = jwt.sign({_id:user._id ,email: user.email,},jwtConfig.secertKey,);
    }
    res.json({data: user,msg:'welcome !',token: accessToken});

};


export const logIn = async(req: Request,res: Response,next: NextFunction)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(421).json({msg:'Error Validation',filed: errors['errors'][0]['path'],error_msg: errors['errors'][0]['msg']});
        }
    const {email , password } = req.body;
    let user ;
    try{
        user = await User.findOne({email:email});
    }catch(err){
        console.log(err);
        res.status(400).json({msg: 'somthing went wrong '});
    }
    if(!user){
        res.status(404).json({msg:'Email or password not match'});
    }
    if(user){
        let check ;
        try{
            check = await bcrypt.compare(password,user?.password);
        }catch(err){
            res.status(400).json({msg: 'somthing went wrong '});
            console.log(err);
        }
        if(check){
            let accessToken: string= '';
            accessToken = jwt.sign({_id:user._id ,email: user.email,},jwtConfig.secertKey,);
            res.json({data: user,msg:'welcome !',token: accessToken});
        }else{
            res.status(404).json({msg:'Email or password not match'});
        }
    }

};

export const getAllUsers = async (req: Request,res: Response,next: NextFunction)=>{
    try{
        const users = await User.find();
        res.json({msg: '',users});
    }catch(err){
        res.status(400).json({msg: 'somthing went wrong '});
        console.log(err);
    };
};

export const getProfile = async (req: Request,res: Response,next: NextFunction)=>{
    
};
