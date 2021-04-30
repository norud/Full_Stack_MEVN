import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  // _marketplace_id:{type: mongoose.Types.ObjectId, required: true},
  rol: { type: String, maxlength: 100, required: true },
  name: { type: String, maxlength: 50, required: true },
  document_type: { type: String, maxlength: 50 },
  document_number: { type: String, maxlength: 50 },
  email: { type: String, unique: true, required: true },
  password: { type: String, maxlength: 60, required: true },
  phone: { type: String, maxlength: 60},
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

//export as models
const User = mongoose.model("user", userSchema);
export default User;