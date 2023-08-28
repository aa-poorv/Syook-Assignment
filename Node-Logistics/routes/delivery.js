const express = require("express");
const router = express.Router();
const fs = require("fs");
const Item = require("../models/item");
const createError = require("http-errors");
const DeliveryVehicle = require("../models/deliveryVehicle");
const Order = require("../models/order");
const { verifyAccessToken } = require("../helper/jwt_helper");
const { sign } = require("jsonwebtoken");
const roles_list = require("../config/roles_list");
const UserVerify = require("../middleware/UserVerify");
const { route } = require("./customer");

router.use(verifyAccessToken);

router.post(
  "/confirm/:id",
  UserVerify(roles_list[0], roles_list[1]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const orderUpdated = await Order.findByIdAndUpdate(id, {
        isDelivered: true,
      }).populate("itemId");
      if (!orderUpdated || orderUpdated.isDelivered === true) {
        return next(createError.BadRequest());
      }

      const vehicleUpdated = await DeliveryVehicle.findOneAndUpdate(
        { registrationNumber: orderUpdated.deliveryVehicleId },
        { $inc: { activeOrdersCount: -1 } }
      );
      fs.appendFile(
        "logFile.txt",
        `Order delivered:\r\n   order-number-${orderUpdated.orderNumber}\r\n    userId-${orderUpdated.customerId}\r\n    item-${orderUpdated.itemId.name} ${orderUpdated.itemId.price}\r\n \r\n`,
        function (err) {
          if (err) throw err;
          console.log("Saved!");
        }
      );
      res.send("Congrats order delivered");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
