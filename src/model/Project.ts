import { Schema , model } from "mongoose";

const projectSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    tasks:[{
        _id: Schema.Types.ObjectId , 
        user: {
            _id: Schema.Types.ObjectId,
            firstName: String,
            lastName: String,
            email: String
        },
        priority: String,
        status: String,
        title: String,
        desc: String,
        deadline: Date,
        tags:[],
        label: String
    }],user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true,
});


export default model('Project',projectSchema);
