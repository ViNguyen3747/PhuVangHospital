import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    employee: { type: String, required: true },
    date: { type: Date, default: new Date(), required: true },
    taskName: { type: String, required: true },
    createdAt: {
      type: Date,
      default: new Date(),
      required: true,
    },
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
