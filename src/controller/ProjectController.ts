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


// export const updateTaskOfProject = async(req:Req,res:Response,next: NextFunction)=>{
//     const { id } = req.params;
//     const { taskId , title, desc, status,priority , deadline,tags,labelId } = req.body;
//     try{
//         const project = await Project.findById(id);
//         if(!project){
//             throw new Error('No Project match with this id');
//         }
//         if(project.user.toString() !== req.user?._id.toString()){
//             throw new Error('You can\'t add task to this project !');
//         }
//         const label = await Label.findById(labelId);
//         if(!label){
//             throw new Error('No label match this label id');
//         }
//         const task = await Task.findByIdAndUpdate(taskId,{
//                     title,
//                     desc,
//                     status,
//                     priority,
//                     deadline,
//                     tags,
//                     label,
//                 },{
//                     new: true,
//                 });
//         if(!task){
//             throw new Error('No task match with task id');
//         }
//         // Find the task index in the project's tasks array
//         let taskIndex = -1;
//         project.tasks.forEach((taskItem, index) => {
//             if(taskItem._id.toString() === taskId.toString()){
//                 taskIndex = index;
//             }
//         });
        
//         if(taskIndex === -1){
//             throw new Error('Task not found in this project');
//         }

//         // Update the embedded task with new data
//         project.tasks[taskIndex] = {
//             _id: task._id,
//             user: {
//                 _id: task.user,
//                 firstName: req.user?.firstName || '',
//                 lastName: req.user?.lastName || '',
//                 email: req.user?.email || ''
//             },
//             priority: task.priority,
//             status: task.status,
//             title: task.title,
//             desc: task.desc,
//             deadline: task.deadline,
//             tags: task.tags,
//             // label: task.label
//         };
//         await project.save();
        
//         res.json({msg: 'Project\'s tasks :',data: project.tasks});
//     }catch(err){
//         return next(err);
//     }
// };