const authorization = (req, res, next) => {
  try {
    const currentUser = req.currentUser;

    // cek apabila crud room dan crud type hanya bisa di akses oleh admin, selain itu user biasa
    // cara
    if (!currentUser.includes(is_guest)) {
      throw new Error("unauthorize access");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
