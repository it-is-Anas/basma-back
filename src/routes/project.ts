import { Router } from "express";
import { create , get , destroy , update} from '../controller/ProjectController';
import { body, param } from "express-validator";
import { checkValidate } from "../middleware/validate";

const routes = Router();

routes.post('/',[
    body('title','title id has to be at least 3 chars and 15')
    .isString()
    .isLength({min: 3,max: 15}),
    checkValidate,
],create);

routes.get('/',get);

routes.delete('/:id',[
    param('id','Id is not valid')
        .isString()
    ,checkValidate
    ]
,destroy);



routes.patch('/:id',[
    param('id','Id is not valid')
        .isString(),
    body('title','title id has to be at least 3 chars and 15')
    .isString()
    .isLength({min: 3,max: 15})
    ,checkValidate
    ]
,update);




export default routes;