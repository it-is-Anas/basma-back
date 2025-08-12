
import { Router } from "express";
import { body } from "express-validator";

import { signUp , logIn , getAllUsers } from '../controller/AuthController';

const routes = Router();
routes.post('/sign-up',[
    body('first_name','first_name is required (3 chars atleast)')
    .isString()
    .isLength({min: 3, max: 10}),
    body('last_name','last_name is required (3 chars atleast)')
    .isString()
    .isLength({min: 3, max: 10}),
    body('email','email is required to be email')
    .isString()
    .isEmail(),
    body('password','password is required to be 8 nimurce atleast')
    .isNumeric()
    .isLength({min: 8, max: 20}),
],signUp);

routes.post('/',[
    body('email','email is required to be email')
    .isString()
    .isEmail(),
    body('password','password is required to be 8 nimurce atleast')
    .isNumeric()
    .isLength({min: 8, max: 20}),
],logIn );

routes.get('/',getAllUsers);


export default routes;