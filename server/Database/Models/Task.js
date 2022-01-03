import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, default: new Date(), required: true },
    employee: [
      {
        type: String,
      },
    ],
    department: { type: String, requried: true },
    createdAt: {
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
