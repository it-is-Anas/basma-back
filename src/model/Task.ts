import mongoose from "mongoose";


const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    priority: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String
    },
    deadline: {
        required: true,
        type: Date,
    },
    tags: {
        required: true,
        type: Date,
    },
    labels: {
        required: true,
        type: Date,
    },
},{
    timestamps: true,
});



export default mongoose.model('task',taskSchema);