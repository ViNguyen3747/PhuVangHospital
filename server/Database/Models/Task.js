import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    employee: { type: String, required: true },
    task: [[{ type: String }]],
    createdAt: {
      type: Date,
      default: new Date(),
      required: true,
    },
    updatedBy: { type: String },
    updatedAt: {
      type: Date,
      default: new Date(),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
