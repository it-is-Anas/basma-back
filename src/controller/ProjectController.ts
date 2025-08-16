import { Req } from "../types";
import { Response , NextFunction } from "express";
import Project from "../model/Project";

export const create =  async (req:Req,res:Response,next: NextFunction)=>{
    const { title } = req.body;
    try{
        const project = await Project.create({
            title,
            tasks: [],
            user: req.user,
        });
        res.status(201).json({
            msg: 'project created successful',
            data: project,
        });
    }catch(err: any){
        res.status(500).json({
            msg: err.message|| 'somthing went wrong please try again later!',
        });
    };
};

export const get = async (req:Req,res:Response,next: NextFunction)=>{
    try{
        const projects = await Project.find({user: req.user});
        res.status(200).json({
            msg: 'project created successful',
            data: projects,
        });
    }catch(err: any){
        res.status(500).json({
            msg: err.message|| 'somthing went wrong please try again later!',
        });
    };
};

export const destroy = async (req:Req,res:Response,next: NextFunction) => {
    const { id } = req.params;
    try{
        const project = await Project.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'project deleted successfully',
        });
    }catch(err: any){
        res.status(500).json({
            msg: err.message|| 'somthing went wrong please try again later!',
        });
    };
};

export const update = async  (req:Req,res:Response,next: NextFunction) => {
    const { id } = req.params;
    const { title } = req.body;
    try{
        const checkProject = await Project.find({id,user: req.user});
        if(!checkProject){
            throw new Error('You don\'t have project with this id ! ');
        }
        const project = await Project.findByIdAndUpdate(id,{
            title,
        },{
            new: true,
        });
        res.status(200).json({
            msg: 'project updated successfully',
            data: project
        });
    }catch(err: any){
        res.status(500).json({
            msg: err.message|| 'somthing went wrong please try again later!',
        });
    };
};