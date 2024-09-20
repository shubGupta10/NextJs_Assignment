import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum:  ["to-do", "in progress", "completed"],
        default: "to-do"
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
    },

    dueDate: {
        type: Date,
        required: true
    },

    createdBy: {
        type: String,
        ref: "User",
        required: true
    }
}, {timestamps: true})


const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;