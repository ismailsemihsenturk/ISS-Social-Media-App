import mongoose from "mongoose"

const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,  
        max: 500,  
    },
    img: {
        type: Array,
        default:[]
    },
    likes: {
        type: Array,
        default: []
    },
    
}, { timestamps: true } );

export default mongoose.model("Post", PostSchema);