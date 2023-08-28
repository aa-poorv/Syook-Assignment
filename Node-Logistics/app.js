require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const customerRouter = require("./routes/customer");
const deliveryRouter = require("./routes/delivery");
const User = require("./models/user");
const Order = require("./models/order");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB Connected"));

const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(__dirname, "/views")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "this is the secret",
    saveUninitialized: true,
    resave: false,
  })
);
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/customer", customerRouter);
app.use("/delivery", deliveryRouter);

const func = async () => {
  const isThere = await Order.findOne({ orderNumber: "initialValue" });
  if (!isThere) {
    const doc = await Order.create({ orderNumber: "initialValue", val: "1" });
  }
};

func();

app.post("/newOrder", async (req, res, next) => {
  const order = new Order(req.body);
  order.save();
  res.send("New order created");
});

app.get("/", async (req, res, next) => {
  try {
    if (!req.userId) return next(createError.Unauthorized());
    const { fullName } = await User.findById(req.userId);
    res.send(`home ${fullName}`);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => console.log("listening on port"));
