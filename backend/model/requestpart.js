import mongoose from "mongoose";

let schema = new mongoose.Schema({
  partname: { type: String },
  partnumber: { type: Number },
});

export const requestpart = mongoose.model("partrequest", schema);