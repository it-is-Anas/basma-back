import { Router } from "express";
import { create , get , destroy , update , addTaskToProject , getTaskOfProject  } from '../controller/ProjectController';
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


routes.post('/add-task/:id',[
    param('id','Id is not valid').isString(),
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
], addTaskToProject);



routes.get('/get-tasks/:id',[param('id').isString(),checkValidate],getTaskOfProject)

// routes.patch('/update-task/:id',[
//     param('id').isString(),
//     body('taskId','title is a required filed')
//     .isString(),
//     body('title','title is a required filed')
//     .isString()
//     .isLength({min:3,max:15}),
//     body('desc','desc is a required filed')
//     .isString()
//     .isLength({min:0,max: 30}),
//     body('deadline','deadline is required')
//     .isString(),
//     body('tags','tags is required')
//     .isArray(),
//     body('priority','priority is required')
//     .isString(),
//     body('labelId','label id is required')
//     .isString(),
//     body('status','status is required ')
//     .isString(),
//     checkValidate
// ],updateTaskOfProject);


export default routes;