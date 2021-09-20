const Category = require("../models/category");
const { check, validationResult } = require("express-validator");

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "No category Found",
      });
    }
    res.json(category);
  });
};

exports.getCategory = (req, res) => {
  res.json(req.category);
};

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "No category Found",
      });
    }

    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Error While Creating New Category",
      });
    }
    res.json({ category });
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Error While Updating  Category",
      });
    }
    res.json(category);
  });
};
exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Fail to remove",
      });
    }
    res.json({
      message: "Successfully Deleted ",
    });
  });
};
