import { Schema , model } from "mongoose";

const projectSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    tasks:[
    ],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true,
});

export default model('Project',projectSchema);
