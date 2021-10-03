const type = require("../models").Type;

class Type {
  static async makeType(req, res, next) {
    const { is_include_breakfast, type_name, price } = req.body;
    if (!is_include_breakfast || !type_name || !price) {
      next({
        code: 415,
        message: "is_include_breakfast, type_name, price must be fill"
      });
    } else {
      const isTypeNameExist = await type.findOne({
        where: {
          type_name: type_name
        }
      });
      if (isTypeNameExist) {
        next({
          code: 409,
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

  static async readAll(req, res, next) {
    let typesAll = await type.findAll();
    if (!typesAll.length) {
      next({
        code: 404,
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

  static async readById(req, res, next) {
    const { id } = req.params;
    const types = await type.findByPk(id);
    if (!types || type.is_deleted) {
      next({
        code: 404,
        message: "type not found"
      });
    } else {
      res.status(200).json({
        message: "success geting type",
        types
      });
    }
  }

  static async updateType(req, res, next) {
    const { id } = req.params;
    const { is_include_breakfast, type_name, price } = req.body;
    const types = await type.findByPk(id);
    if (!types) {
      next({
        code: 404,
        message: "type not found"
      });
    } else if (!is_include_breakfast && !type_name && !price) {
      next({
        code: 415,
        message: "please fill includeBreakfast, typeName, or price"
      });
    } else {
      types.is_include_breakfast =
        +is_include_breakfast === 1 || types.is_include_breakfast;
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
