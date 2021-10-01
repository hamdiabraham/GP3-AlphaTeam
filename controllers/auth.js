const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models").User;

class Auth {
  static async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      next({ code: 415, message: "email and password must be fill" });
    } else if (!password.length >= 8 && !password.length <= 16) {
      next({
        code: 415,
        message: "password min 8 character and max 16 character"
      });
    } else if (!/[\w\d]+@[\w]+\.[\w]+/.test(email)) {
      next({ code: 415, message: "invalid email" });
    } else {
      const user = await users.findOne({
        where: {
          email: email
        }
      });
      if (user == null || !bcrypt.compareSync(password, user.password)) {
        next({ code: 401, message: "email or password is wrong" });
      } else {
        const token = jwt.sign({ id: user.id }, "secure");
        res.status(200).json({
          message: "success login",
          token
        });
      }
    }
  }

  static async register(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      next({ code: 415, message: "name, email, and password must be fill" });
    } else if (!/[\w\d]+@[\w]+\.[\w]+/.test(email)) {
      next({ code: 415, message: "invalid email" });
    } else if (!(password.length >= 8 && password.length <= 16)) {
      next({
        code: 415,
        message: "password min 8 character and max 16 character"
      });
    } else {
      const user = await users.findOne({
        where: {
          email: email
        }
      });
      if (user) {
        next({
          code: 409,
          message: "user already exist"
        });
      } else {
        const user = await users.create({
          name,
          email,
          password: bcrypt.hashSync(password)
        });
        const token = jwt.sign({ id: user.id }, "secure");
        res.status(201).json({
          message: "success register",
          token
        });
      }
    }
  }
}

module.exports = Auth;
