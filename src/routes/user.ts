import { Router } from "express";
import type { Response ,NextFunction} from "express";
import type { Req } from '../types';
import { myProfile, uploadProfilePicture } from "../controller/UserController";
import upload from "../config/multer";

const routes = Router();

routes.get('/profile',myProfile);

routes.post('/upload-profile-picture', 
    upload.single('image'), 
    uploadProfilePicture
);


export default routes; 