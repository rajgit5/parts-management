import mongoose from "mongoose";

let schema = new mongoose.Schema({
  partname: { type: String },
  partnumber: { type: Number },
  partqueantity: { type: Number },
  partprice: { type: String },
});

export const partmodel = mongoose.model("part", schema);
