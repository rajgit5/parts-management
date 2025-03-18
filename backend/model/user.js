import mongoose from "mongoose";

let schema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
});

export const usermodel = mongoose.model("user", schema);
