import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  email: {
    type: String,
    required: true,
  }
});

const studentModel =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default studentModel;
