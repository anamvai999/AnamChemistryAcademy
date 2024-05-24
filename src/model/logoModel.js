import mongoose, { Schema } from "mongoose";

const logoSchema = new Schema({
    logo: String
});

const LogoModel = mongoose.models.Logo || mongoose.model("Logo", logoSchema);
export default LogoModel;
