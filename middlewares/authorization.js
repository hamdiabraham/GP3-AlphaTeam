const authorization = (req, res, next) => {
  const endPoint = req.url;

  console.log(endPoint);

  try {
    const currentUser = req.currentUser;

    if (!currentUser.includes(is_guest)) {
      throw new Error("unauthorize access");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
