import { Response , NextFunction } from "express";
import { Req } from "../types";
import Label from '../model/Label';

export const create = async (req:Req,res:Response,next:NextFunction)=>{
    const { label } = req.body;
    try{
        const checkLabel = await Label.findOne({label: label });
        if(checkLabel){
            throw new Error('label is all ready exist');
        }
    }catch(err: any){
        return next(err);
    }
    try{
        const newLabel = await Label.create({label: label,user: req.user});
        res.status(201).json({
            msg: 'Label Created Succefully',
            label: newLabel,
        });
    }catch(err: any){
        return next(err);
    }
};


export const get = async (req:Req,res:Response,next: NextFunction)=>{
    try{
        const labels = await Label.find();
        res.json({
            msg: 'Labels ',
            data: labels,
        });
    }catch(err: any){
        return next(err);
    };
};


export const destroy = async (req:Req,res: Response,next: NextFunction)=>{
    const { id }  = req.params;
    try{
        const label = await Label.findById(id);
        if(label){
            await label.deleteOne();
            res.status(200).json({msg:'label has been deleted!'});
        }else{
            throw new Error('No label with this id');
        }
    }catch(err: any){
        return next(err);
    }
};  

export const update = async (req:Req,res:Response,next:NextFunction)=>{
    const { id } = req.params;
    const { label } = req.body;
    try{
        const theLabel = await Label.findById(id);
        if(!theLabel){
            throw new Error('No label with this id');
        }
        if(req.user && (theLabel.user.toString() !== req.user._id.toString())){
            throw new Error('You can update this label');
        }
        const checkExist = await Label.findOne({label});
        if(checkExist){
            throw new Error('This label is already exist !');
        }
        if(label === theLabel.label){
            throw new Error('Same label don\'t need to update !')
        }
        const lastLabel = await Label.findByIdAndUpdate(
            id,
            { label },
            { new: true }
        );
        res.json({
            msg: 'label has been updated !',
            label: lastLabel,
        })
    }catch(err: any){
        return next(err);
    };
};