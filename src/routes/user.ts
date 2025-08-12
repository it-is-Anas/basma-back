import { Router } from "express";
import type { Request ,Response ,NextFunction} from "express";
import { myProfile } from "../controller/UserController";


const routes = Router();

routes.get('/profile',myProfile);


export default routes;