import { Response , NextFunction } from "express";
import { Req } from "../types";
import Task from "../model/Task";
import Label from "../model/Label";



export const create = async (req:Req,res:Response,next: NextFunction)=>{
    const { title, desc, status,priority , deadline,tags,labelId } = req.body;
    try{   
        const label = await Label.findById(labelId);
        if(!label){
            throw new Error('No label found with this label id');
        }
        const task = await Task.create({
            title,
            desc,
            status,
            priority,
            deadline,
            tags,
            label,
            user: req.user
        });

        res.status(201).json({
            msg:'Task created Successfull',
            data: task,
        });

    }catch(err: any){
        return next(err);
    }
};

export const get = async (req:Req,res:Response,next: NextFunction)=>{
    try{
        const tasks = await Task.find({user: req.user,project: false});
        res.status(200).json({
            msg:'Your tasks',
            data: tasks,
        });
    }catch(err: any){
        return next(err);
    };
};

export const destroy = async (req:Req,res:Response,next: NextFunction)=>{
    const { id } = req.params;
    try{
        const task = await Task.findByIdAndDelete(id);
        res.json({
            msg: 'Task deleted succeful',
        })
    }
    catch(err: any){
        return next(err);
    };
};

export const update = async  (req:Req,res:Response,next: NextFunction)=>{
    const { id } = req.params;
    const { title, desc, status,priority , deadline,tags,labelId } = req.body;
    try{
        const label = await Label.findById(labelId);
        if(!label){
            throw new Error('No label found with this label id');
        }
        const checkTask = await Task.findOne({_id: id,user: req.user});
        if(!checkTask){
            throw new Error('You don\'t have task with this id !');
        }
        const task = await Task.findByIdAndUpdate(id,{
            title,
            desc,
            status,
            priority,
            deadline,
            tags,
            label,
        },{
            new: true,
        });
        res.status(201).json({
            msg: 'You have updated this task!',
            data: task,
        });
    }catch(err: any){
        return next(err);
    };
};