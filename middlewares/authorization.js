const authorization = (req, res, next) => {
  try {
    const currentUser = req.currentUser;
    const endPoint = req.url;
    console.log(endPoint);
    console.log(currentUser.is_guest);

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
      throw new Error("unauthorize access");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
