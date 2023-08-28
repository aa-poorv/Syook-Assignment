const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Item = require("../models/item");
const DeliveryVehicle = require("../models/deliveryVehicle");
const { verifyAccessToken } = require("../helper/jwt_helper");
const { sign } = require("jsonwebtoken");
const roles_list = require("../config/roles_list");
const UserVerify = require("../middleware/UserVerify");

router.use(verifyAccessToken);

router.post(
  "/addVehicle",
  UserVerify(roles_list[0]),
  async (req, res, next) => {
    try {
      const { vehicleType, city } = req.body;
      const vehicle = await DeliveryVehicle.create({ vehicleType, city });
      res.send("New Vehicle is added");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/vehicles", UserVerify(roles_list[0]), async (req, res, next) => {
  try {
    const vehicles = await DeliveryVehicle.find({});
    res.send(vehicles);
  } catch (err) {
    next(err);
  }
});

router.post("/addItem", UserVerify(roles_list[0]), async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const item = await Item.create({ name, price });
    res.send("item is created successfully");
  } catch (err) {
    next(err);
  }
});

router.post(
  "/updateItem/:id",
  UserVerify(roles_list[0]),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name, price } = req.body;
      const item = await Item.findByIdAndUpdate(id, { name, price });
      res.send(item);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/availVehicles",
  UserVerify(roles_list[0]),
  async (req, res, next) => {
    try {
      const vehicles = await DeliveryVehicle.find({
        activeOrdersCount: { $lte: 2 },
      });
      res.send(vehicles);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/updateVehicle/:id",
  UserVerify(roles_list[0]),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      let { vehicleType, city } = req.body;
      console.log(vehicleType, city);
      if (city) {
        city = city.toLowerCase();
      }
      const item = await DeliveryVehicle.findByIdAndUpdate(id, {
        vehicleType,
        city,
      });
      res.send(item);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
