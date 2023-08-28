const mongoose = require("mongoose");

const deliveryVehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: Number,
    default: Date.now(),
    unique: true,
  },
  vehicleType: {
    type: String,
    enum: ["bike", "truck"],
  },
  city: {
    type: String,
    required: true,
  },
  activeOrdersCount: {
    type: Number,
    default: 0,
  },
});

deliveryVehicleSchema.pre("save", function (next) {
  this.city = this.city.toLowerCase();
  next();
});

const DeliveryVehicle = mongoose.model(
  "DeliveryVehicle",
  deliveryVehicleSchema
);

module.exports = DeliveryVehicle;
