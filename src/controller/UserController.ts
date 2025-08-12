import { Response, NextFunction } from "express";
import { Req } from '../types';

export const myProfile = (req: Req ,res: Response, next: NextFunction) => {
    res.json({
        msg:'Your profile !',
        data: req.user
    });
}