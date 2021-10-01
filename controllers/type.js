const type = require("../models").Type;

class Type {
  static async makeType(req, res) {
    const { is_include_breakfast, type_name, price } = req.body;
    if (!is_include_breakfast || !type_name || !price) {
      res.status(400).json({
        message: "is_include_breakfast, type, price must be fill",
      });
    } else {
      const isTypeNameExist = await type.findOne({
        where: {
          type_name: type_name,
        },
      });
      if (isTypeNameExist) {
        res.status(409).json({
          message: "type name is exist",
        });
      } else {
        const types = await type.create({
          is_include_breakfast: is_include_breakfast,
          type_name: type_name,
          price: price,
        });
        res.status(201).json({
          message: "success create type room",
          types,
        });
      }
    }
  }

  static async readAll(req, res) {
    console.log(req.url);
    let typesAll = await type.findAll();
    if (!typesAll) {
      res.status(404).json({
        message: "type not found",
      });
    } else {
      typesAll = typesAll.filter((item) => !item.is_deleted);
      res.status(200).json({
        message: "success getting all type",
        typesAll,
      });
    }
  }
}

module.exports = Type;
