import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email!",
      },
    },
    phone: { type: String },
    address: { type: String },
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

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
