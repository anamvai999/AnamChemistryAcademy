import  mongoose, {Schema} from 'mongoose';


const categorySchema = new Schema({
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
});

const categoryModel =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default categoryModel;
