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
});



export default mongoose.model('task',taskSchema);