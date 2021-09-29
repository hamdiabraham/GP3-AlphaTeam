const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models").User;

class Auth {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "email and password must be fill"
      });
    }

    if (password.length >= 8 && password.length <= 16) {
      if (/[\w\d]+@[\w]+\.[\w]+/.test(email)) {
        const user = await users.findOne({
          where: {
            email: email
          }
        });
        if (user != null && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ id: user.id }, "secure");
          res.status(200).json({
            message: "success login",
            user,
            token
          });
        } else {
          res.status(401).json({
            message: "fail login"
          });
        }
      } else {
        res.status(400).json({
          message: "invalid email"
        });
      }
    } else {
      res.status(400).json({
        message: "password min 8 character and max 16 character"
      });
    }
  }

  static async register(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        message: "name, email, dan password must be fill"
      });
    } else if (!/[\w\d]+@[\w]+\.[\w]+/.test(email)) {
      res.status(400).json({
        message: "invalid email"
      });
    } else if (!(password.length >= 8 && password.length <= 16)) {
      res.status(400).json({
        message: "password min 8 character and max 16 character"
      });
    } else {
      const user = await users.findOne({
        where: {
          email: email
        }
      });
      if (user) {
        res.status(409).json({
          message: "user already exist"
        });
      } else {
        const user = await users.create({
          name,
          email,
          password: bcrypt.hashSync(password)
        });
        res.status(201).json({
          message: "success register",
          user
        });
      }
    }
  }
}

module.exports = Auth;
