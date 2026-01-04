import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending",

    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low",

    },
     dueDate: {
        type: Date,
        required: true
    },

    description: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
)

const Notes = mongoose.model("Notes", NotesSchema)
export default Notes