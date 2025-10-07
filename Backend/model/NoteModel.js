import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ["Active","Pending" ,"Completed"],
        default: "Active",
       
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Very High"],
        default: "Medium",
     
    },
    noteDescription: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
)

const Notes=mongoose.model("Notes",NotesSchema)
export default Notes