

import { validationResult } from "express-validator";
import { Req } from "../types";
import { Response , NextFunction } from "express";


export const checkValidate = (req:Req,res:Response,next:NextFunction)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(421).json({msg:'Error Validation',filed: errors['errors'][0]['path'],error_msg: errors['errors'][0]['msg']});
    }
    next();
};