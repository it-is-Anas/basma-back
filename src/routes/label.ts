import { Router } from "express";

import { checkValidate } from "../middleware/validate";
import {  create , get, destroy, update } from '../controller/LabelController';
import { body, param } from "express-validator";

const routes = Router();

routes.post('/',[
        body('label')
        .isString()
        .isLength({min: 3,max: 10})
    ],
    checkValidate
    ,create);


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
    body('label')
    .isString()
    .isLength({min: 3,max: 10})
    ,checkValidate
],update);

export default routes;