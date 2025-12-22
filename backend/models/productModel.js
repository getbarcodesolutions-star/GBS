import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});

const ProductSchema = new mongoose.Schema(
  {
    // common
    name: String,
    description: String,
    price: Number,
    category: String,
    bestseller: Boolean,

    // label
    size: String,
    paper: String,
    core: String,
    perroll: String,
    ups: String,
    winding: String,
    weight: String,

    // ribbon
    grade: String,
    ribbonsize: String,

    // printer
    brand:String,
    resolution: String,
    maxPrintSpeed: String,
    maxWidth: String,
    maxLength: String,
    dimension: String,
    labelRollCapacity: String,
    ribbon: String,
    processor: String,
    memory: String,
    interface: String,
    power: String,
    operationSwitch: String,
    sensors: String,
    accessories: String,

    // parts
    modelno: String,
    warranty: String,

    // images
    images: [ImageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
