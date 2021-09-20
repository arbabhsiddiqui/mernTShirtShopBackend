const Category = require("../models/category");
const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { check, validationResult } = require("express-validator");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "No product Found",
        });
      }

      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with images",
      });
    }

    // destructure fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "all fields requred",
      });
    }

    // restriction on fields
    let product = new Product(fields);

    // handel file here
    if (file.photo) {
      if (file.photo.size > 9000000) {
        return res.status(400).json({
          error: "images size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // saving into database
    product.save((err, product) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "error while save product into database" });
      }
      return res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
    next();
  }
};

exports.getAllProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.limit : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "error while getting products",
        });
      }
      res.json(product);
    });
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "error while deleting product",
      });
    }
    res.json({
      message: "product remove successfully",
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with images",
      });
    }

    // updation code
    let product = req.product;
    product = _.extend(product, fields);

    // handel file here
    if (file.photo) {
      if (file.photo.size > 9000000) {
        return res.status(400).json({
          error: "images size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // saving into database
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: "updation fail" });
      }
      return res.json(product);
    });
  });
};

exports.updateStock = (req, res, next) => {
  let myOperation = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    };
  });

  Product.bulkWrite(myOperation, {}, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "bulk updating fail",
      });
    }
    next();
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "error while getting category",
      });
    }
    res.json(category);
  });
};
