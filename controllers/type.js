const type = require("../models").Type;

class Type {
  static async makeType(req, res) {
    const { is_include_breakfast, type_name, price } = req.body;
    if (!is_include_breakfast || !type_name || !price) {
      res.status(400).json({
        message: "is_include_breakfast, type_name, price must be fill"
      });
    } else {
      const isTypeNameExist = await type.findOne({
        where: {
          type_name: type_name
        }
      });
      if (isTypeNameExist) {
        res.status(409).json({
          message: "type name is exist"
        });
      } else {
        const types = await type.create({
          is_include_breakfast: is_include_breakfast,
          type_name: type_name,
          price: price
        });
        res.status(201).json({
          message: "success create type room",
          types
        });
      }
    }
  }

  static async readAll(req, res) {
    let typesAll = await type.findAll();
    if (!typesAll) {
      res.status(404).json({
        message: "type not found"
      });
    } else {
      typesAll = typesAll.filter(item => !item.is_deleted);
      res.status(200).json({
        message: "success getting all type",
        typesAll
      });
    }
  }

  static async readById(req, res) {
    const { id } = req.params;
    const types = await type.findByPk(id);
    if (!types || type.is_deleted) {
      res.status(404).json({
        message: "type not found"
      });
    } else {
      res.status(200).json({
        message: "success geting type",
        types
      });
    }
  }

  static async updateType(req, res) {
    const { id } = req.params;
    const { is_include_breakfast, type_name, price } = req.body;
    const types = await type.findByPk(id);
    if (!types) {
      res.status(404).json({
        message: "type not found"
      });
    } else if (!is_include_breakfast && !type_name && !price) {
      res.status(400).json({
        message: "please fill includeBreakfast, typeName, or price"
      });
    } else {
      types.is_include_breakfast =
        is_include_breakfast || types.is_include_breakfast;
      types.type_name = type_name || types.type_name;
      types.price = price || types.price;
      types.save();

      res.status(200).json({
        message: "success update type",
        types
      });
    }
  }

  static destroyType = async (req, res, next) => {
    let { id } = req.params;
    try {
      let types = await type.findByPk(id);
      types.destroy();
      res.status(200).json({
        message: "deleted success"
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = Type;
