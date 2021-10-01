class Room {
  static async chooseRoom(req, res) {
    const { typeRoom, isSingleBed } = req.body;

    if (!typeRoom || !isSingleBed) {
      res.status(400).json({
        message: "typeRoom and isSingleBed must be fill",
      });
    }
  }
}
