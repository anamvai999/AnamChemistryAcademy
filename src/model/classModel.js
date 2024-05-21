import mongoose, { Schema } from "mongoose";

const classSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: String,
    required: true,
  },

  material: {
    type: String,
    required: true,
  },
  chapterSlug: {
    type: String,
    required: true,
  },
});

const classModel =
  mongoose.models.Class || mongoose.model("Class", classSchema);

export default classModel;
