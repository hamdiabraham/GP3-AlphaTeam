const authorizations = (is_guest) => (err, req, res, next) => {
  try {
    const currentUser = req.currentUser;

    if (!currentUser.role.includes(is_guest)) {
      throw new Error("unauthorize access");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizations;
