const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// get custom Functions
const { getCategoryById } = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const { isAdmin, isSignedIn, isAuth } = require("../controllers/auth");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  getAllProduct,
  deleteProduct,
  updateProduct,
  updateStock,
  bulkWrite,
  getAllUniqueCategories,
} = require("../controllers/product");

// params
router.param("productId", getProductById);
router.param("categoryId", getCategoryById);
router.param("userId", getUserById);

// create routes
router.post("/product/:userId", isSignedIn, isAuth, isAdmin, createProduct);

// get
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// update
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  updateProduct
);

// delete
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  deleteProduct
);

// listing
router.get("/product", getAllProduct);
router.get("/product/categories", getAllUniqueCategories);

// test;
// router.get("/test", getAllCategories, (req, res) => {
//   res.json(req.auth);
// });

module.exports = router;
