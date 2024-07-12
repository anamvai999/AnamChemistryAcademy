import mongoose, { Schema } from "mongoose";

const examSchema = new Schema(
  {
    examTitle: {
      type: String,
      required: true,
    },
    examLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExamModel = mongoose.models.Exam || mongoose.model("Exam", examSchema);

export default ExamModel;
