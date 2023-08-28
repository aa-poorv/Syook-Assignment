const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      requires: true,
    },
    email: {
      type: String,
      requires: true,
      // unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ["User", "Admin", "Delivery"],
      default: ["User"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.city = user.city.toLowerCase();

  if (!user.isModified("password")) return;

  user.password = await bcrypt.hash(user.password, 10);
  next();
});

userSchema.statics.checkUser = async function (email, password) {
  const foundUser = await this.findOne({ email: email });
  let isValid = false;
  if (foundUser) {
    isValid = await bcrypt.compare(password, foundUser.password);
  }

  return isValid ? foundUser : false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
