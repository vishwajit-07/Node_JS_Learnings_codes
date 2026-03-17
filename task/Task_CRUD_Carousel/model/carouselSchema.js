const mongoose = require("mongoose");
const carouselSchema = new mongoose.Schema({
  sliderTitle: { type: String, required: true },
  sliderCaption: { type: String, required: true },
  sliderImage: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("carousel", carouselSchema);
