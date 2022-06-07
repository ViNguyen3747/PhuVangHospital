import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    employee: { type: String, required: true },
    // date: { type: Date, default: new Date(), required: true },
    // date: { type: Number, required: true },
    // month: { type: Number, required: true },
    // taskName: { type: String },
    task: [{ type: String }],
    // task: {
    //   _1: { type: String },
    //   _2: { type: String },
    //   _3: { type: String },
    //   _4: { type: String },
    //   _5: { type: String },
    //   _6: { type: String },
    //   _7: { type: String },
    //   _8: { type: String },
    //   _9: { type: String },
    //   _10: { type: String },
    //   _11: { type: String },
    //   _12: { type: String },
    //   _13: { type: String },
    //   _14: { type: String },
    //   _15: { type: String },
    //   _16: { type: String },
    //   _17: { type: String },
    //   _18: { type: String },
    //   _19: { type: String },
    //   _20: { type: String },
    //   _21: { type: String },
    //   _22: { type: String },
    //   _23: { type: String },
    //   _24: { type: String },
    //   _25: { type: String },
    //   _26: { type: String },
    //   _27: { type: String },
    //   _28: { type: String },
    //   _29: { type: String },
    //   _30: { type: String },
    //   _31: { type: String },
    // },
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
}, {
    timestamps: true,
});

const Task = mongoose.model("Task", taskSchema);
export default Task;