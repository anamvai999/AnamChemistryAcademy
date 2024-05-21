import mongoose, { Schema } from "mongoose";

const chapterSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  categorySlug: {
    type: String,
    required: true,
  }

});

const chapterModel =
  mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);

export default chapterModel;
