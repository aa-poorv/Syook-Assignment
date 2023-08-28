const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/user");
require("dotenv").config();

module.exports = {
  signAccessToken: async (userId) => {
    const validUser = await User.findById(userId);
    return new Promise((resolve, reject) => {
      const payload = { roles: validUser.roles };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1d",
        issuer: "adfsdf.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) return reject(createError.InternalServerError());

        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.session.token) return next(createError.Unauthorized());
    const token = req.session.token;
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.roles = payload.roles;
      req.userId = payload.aud;
      next();
    });
  },
};
