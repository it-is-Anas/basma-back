import type { Request ,Response ,NextFunction} from "express";
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config';
import User from '../model/User';

const auth = async(req: Request, res: Response,next: NextFunction) => {
    const token = req.get('Authorization')?.split(' ')[1];
    if(token){
        try{
            const uncoded:any = await jwt.verify(token,jwtConfig.secertKey);
            if(uncoded && uncoded._id){
                const user = await User.findById(uncoded._id);
                if(user){
                    (req as Request & { user?: typeof user }).user = user;
                    next();
                }
            }
        }catch(err){
            res.status(403).json({msg:'Not authurized ! please log in again!'});
            console.log(err);
        }
    }else{
        res.status(403).json({msg:'Not authurized ! please log in again!'});
    }
}

export default auth;