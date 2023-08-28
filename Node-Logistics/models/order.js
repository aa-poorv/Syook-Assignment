const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderNumber: {
      type: String,
      default: "0",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    price: {
      type: Number,
    },
    location: {
      type: String,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryVehicleId: {
      type: String,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    strict: false,
  }
);

orderSchema.pre("save", async function (next) {
  console.log("Chala");
  if (this.orderNumber === "initialValue") return next();
  const initialState = await Order.findOne({ orderNumber: "initialValue" });
  this.orderNumber =
    this.orderNumber.repeat(4 - initialState.val.length) + initialState.val;
  initialState.val = (Number(initialState.val) + 1).toString();
  const finalState = await Order.findOneAndUpdate(
    { orderNumber: "initialValue" },
    { val: initialState.val }
  );
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
