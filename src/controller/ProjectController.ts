import { Req } from "../types";
import { Response , NextFunction } from "express";
import Project from "../model/Project";
import Task from "../model/Task";
import Label from "../model/Label";

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
        return next(err);
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
        return next(err);
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
        return next(err);
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
        return next(err);
    };
};


export const addTaskToProject = async (req:Req,res:Response,next: NextFunction) => {
    const projectId = req.params.id;
    const { title, desc, status,priority , deadline,tags,labelId } = req.body;
    try{
        const project =  await Project.findById(projectId);
        if(!project){
            throw new Error('No Project matched with id !');
        }
        
        if(project.user.toString() !== req.user?._id.toString()){
            throw new Error('You can\'t add task to this project !');
        }

        const label = await Label.findById(labelId);
        if(!label){
            throw new Error('No label match with this id');
        }

        const task = await Task.create({
            title,
            desc,
            status,
            priority,
            deadline,
            label,
            tags,
            user: req.user,
            project: true,
        });

        project.tasks.push(task);
        await project.save();
        res.status(201).json({
            msg: 'Task added!',
            data: project
        });
        

    }catch(err: any){
        return next(err);
    };
};
export const getTaskOfProject =  async (req:Req,res:Response,next: NextFunction) =>{
    const { id } = req.params;
    try{
        const project = await Project.findById(id);
        if(!project){
            throw new Error('No Project match with this id');
        }
        if(project.user.toString() !== req.user?._id.toString()){
            throw new Error('You can\'t add task to this project !');
        }
        res.json({msg: 'Project\'s tasks :',data: project.tasks});
    }catch(err){
        next(err);
    }
};


export const updateTaskOfProject = async(req:Req,res:Response,next: NextFunction)=>{
    const { id } = req.params;
    const { taskId , title, desc, status,priority , deadline,tags,labelId } = req.body;
    try{
        const project = await Project.findById(id);
        if(!project){
            throw new Error('No Project match with this id');
        }
        if(project.user.toString() !== req.user?._id.toString()){
            throw new Error('You can\'t add task to this project !');
        }
        const label = await Label.findById(labelId);
        if(!label){
            throw new Error('No label match this label id');
        }
        let tasks: any = project.tasks;
        project.tasks = project.tasks.map((taskItem: any)=>{
            if(taskItem._id?.toString() === taskId.toString()){
                return {
                    _id: taskItem._id,
                    title: title || taskItem.title,
                    desc: desc || taskItem.desc,
                    status: status || taskItem.status,
                    priority: priority || taskItem.priority,
                    deadline: deadline || taskItem.deadline,
                    tags: tags || taskItem.tags,
                    label: label || taskItem.label,
                };
            }else{
                return taskItem;
            }
        });
        project.save();
        res.status(201).json({
            msg:'task updated succesfully !',
            data: project,
        });
    }catch(err){
        return next(err);
    }
};


export const destroyTaskOfProject = async(req:Req,res:Response,next: NextFunction)=>{
    const { id } = req.params;
    const { taskId , title, desc, status,priority , deadline,tags,labelId } = req.body;
    try{
        const project = await Project.findById(id);
        if(!project){
            throw new Error('No Project match with this id');
        }
        if(project.user.toString() !== req.user?._id.toString()){
            throw new Error('You can\'t add task to this project !');
        }
        
        project.tasks = project.tasks.filter((taskItem: any)=>{
            return (taskItem._id?.toString() !== taskId.toString());
        });
        project.save();

        res.json({msg:'Task has been deleted !',data: project});
    }catch(err){
        return next(err);
    }
};