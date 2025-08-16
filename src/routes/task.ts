import { Router } from "express";
import { body, param } from "express-validator";
import { checkValidate } from "../middleware/validate";
import { create , get , destroy , update} from "../controller/TaskController";
const routes = Router();

routes.post('/',[
    body('title','title is a required filed')
    .isString()
    .isLength({min:3,max:15}),
    body('desc','desc is a required filed')
    .isString()
    .isLength({min:0,max: 30}),
    body('deadline','deadline is required')
    .isString(),
    body('tags','tags is required')
    .isArray(),
    body('priority','priority is required')
    .isString(),
    body('labelId','label id is required')
    .isString(),
    body('status','status is required ')
    .isString(),
    checkValidate,
], create);


routes.get('/',get)

routes.delete('/:id',[
    param('id','Id is not valid')
        .isString()
    ,checkValidate
    ]
    ,destroy);

routes.patch('/:id',[
    param('id','Id is not valid')
        .isString(),
    body('title','title is a required filed')
    .isString()
    .isLength({min:3,max:15}),
    body('desc','desc is a required filed')
    .isString()
    .isLength({min:0,max: 30}),
    body('deadline','deadline is required')
    .isString(),
    body('tags','tags is required')
    .isArray(),
    body('priority','priority is required')
    .isString(),
    body('labelId','label id is required')
    .isString(),
    body('status','status is required ')
    .isString()
    ,checkValidate
    ],
    update
);

export default routes;