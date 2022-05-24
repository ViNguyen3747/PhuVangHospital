import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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

const Department = mongoose.model("Department", departmentSchema);
export default Department;
