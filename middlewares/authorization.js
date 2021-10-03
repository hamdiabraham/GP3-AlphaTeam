const authorization = (req, res, next) => {
  const currentUser = req.currentUser;
  const endPoint = req.url;

  if (
    (new RegExp("/room").test(endPoint) ||
      new RegExp("/type-room").test(endPoint) ||
      new RegExp("/reservation").test(endPoint)) &&
    !currentUser.is_guest
  ) {
    next();
  } else if (
    new RegExp("/reservation").test(endPoint) &&
    currentUser.is_guest
  ) {
    next();
  } else {
    next({ code: 403, message: "unauthorize access" });
  }
};

module.exports = authorization;
