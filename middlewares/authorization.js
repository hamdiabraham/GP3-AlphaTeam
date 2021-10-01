const authorization = (req, res, next) => {
  try {
    const currentUser = req.currentUser;
    const endPoint = req.url;
    console.log(endPoint);
    console.log(currentUser.is_guest);

    if (
      (endPoint === "/room" ||
        endPoint === "/type-room" ||
        endPoint === "/reservation") &&
      !currentUser.is_guest
    ) {
      next();
    } else if (endPoint === "/reservation" && currentUser.is_guest) {
      next();
    } else {
      throw new Error("unauthorize access");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
