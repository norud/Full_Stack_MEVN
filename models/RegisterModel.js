import mongoose, { Schema } from "mongoose";

const registerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  people: { type: Schema.Types.ObjectId, ref: "people", required: true },
  register_type: { type: String, maxlength: 20, required: true },
  register_serie: { type: String, maxlength: 10 },
  register_number: { type: String, maxlength: 10, required: true },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  detail: [
    {
      _id: { type: String, require: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      sale_price: { type: Number, required: true },
    },
  ], //modeling embedded(modelando embebida)
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

//export as models
const Register = mongoose.model("register", registerSchema);
export default Register;
