const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  mileage: { type: Number, required: true },
  colors: { type: String },
  carImage: { type: String, required: true },
  engine: { type: String },
  seatingCapacity: { type: Number },
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model("car", carSchema);
