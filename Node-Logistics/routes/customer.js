const express = require("express");
const app = express();
const fs = require("fs");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Item = require("../models/item");
const DeliveryVehicle = require("../models/deliveryVehicle");
const Order = require("../models/order");
const { verifyAccessToken } = require("../helper/jwt_helper");
const { sign } = require("jsonwebtoken");
const roles_list = require("../config/roles_list");
const UserVerify = require("../middleware/UserVerify");

router.use(verifyAccessToken);

router.get("/items", async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.send(items);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/newOrder/:id",
  UserVerify(roles_list[0], roles_list[1]),
  async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const loc = user.city;
      const vehicles = await DeliveryVehicle.find({
        $and: [{ activeOrdersCount: { $lte: 1 } }, { city: loc }],
      });
      const { id } = req.params;
      const item = await Item.findById(id);
      if (vehicles.length > 0) {
        const order = await Order.create({
          price: item.price * 1.2,
          itemId: item.id,
          location: loc,
          customerId: req.userId,
          deliveryVehicleId: vehicles[0].registrationNumber,
        });
        vehicles[0].activeOrdersCount++;
        vehicles[0].save();
        fs.appendFile(
          "logFile.txt",
          `Order received:\r\n   order-number-${order.orderNumber}\r\n    userId-${order.customerId}\r\n    item-${item.name} ${item.price}\r\n \r\n`,
          function (err) {
            if (err) throw err;
            console.log("Saved!");
          }
        );
      } else {
        return next(
          createError(406, "There are no active vehicles for the order")
        );
      }

      res.send("New Order is placed");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
