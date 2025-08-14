

import mongoose from "mongoose"; 

const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
    }
},{
    timestamps: true,
});
export default mongoose.model('User',userSchema);