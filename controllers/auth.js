const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models").User;

class Auth {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "email and password are required",
      });
    }

    if (password.length >= 8 && password.length <= 16) {
      if (/[\w\d]+@[\w]+\.[\w]+/.test(email)) {
        const user = await users.findOne({
          where: { email: email },
        });
        if (user !== null && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ id: user.id }, "secure");
          res.status(200).json({
            message: "Success login",
            user,
            token,
          });
        } else {
          res.status(401).json({
            message: "fail login",
          });
        }
      } else {
        res.status(400).json({
          message: "Invalid email",
        });
      }
    } else {
      res.status(400).json({
        message: "Minimal password 8 character and maximum 16 character",
      });
    }
  }
}

module.exports = Auth;
