
export interface entity{
    _id: number,
    // createdAt: string,
}; 

export interface user extends entity{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    img?: string|null ,
};


// export interface task extends entity{
//     title: string,
//     desc: string,
//     priority: string,
//     catagory: string[],
//     user: user,
//     deadline: string,
// };
// export interface project extends entity{
//     title: string,
//     tasks: task[] ,
//     user?: user,
// };
// export interface team extends entity{
//     user: user,
//     title: string,
//     tasks: number,
//     members: number,
// };

//  UPDATE ALL OF THOSE

import type { Request ,Response ,NextFunction} from "express";

export type Req = Request & { user?: user|null };