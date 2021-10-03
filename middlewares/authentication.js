const User = require("../models").User;
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    next({ code: 400, message: "access token required!" });
  }

  // verify token
  const jwtPayload = jwt.verify(token, process.env.SECRET_KEY_JWT);

  // check user
  const dataUser = await User.findByPk(jwtPayload.id);
  if (!dataUser) {
    next({ code: 401, message: "invalid access token!" });
  }
  req.currentUser = dataUser;
  next();
};

module.exports = authentication;
