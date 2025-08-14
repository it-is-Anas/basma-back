import { Schema , model } from "mongoose";


const labelSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
});


export default model('Label',labelSchema);

