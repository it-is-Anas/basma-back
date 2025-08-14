import { Router } from "express";
import type { Response ,NextFunction} from "express";
import type { Req } from '../types';
import { myProfile } from "../controller/UserController";

const routes = Router();

routes.get('/profile',myProfile);


export default routes; 