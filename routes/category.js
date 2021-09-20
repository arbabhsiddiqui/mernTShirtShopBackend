const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const { auth, isAdmin, isSignedIn, isAuth } = require("../controllers/auth");
const router = express.Router();

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// routes

router.get("/category", getAllCategories);
router.get("/category/:categoryId", getCategory);

router.post("/category/:userId", isSignedIn, isAuth, isAdmin, createCategory);

router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  deleteCategory
);

// test;
// router.get("/test", getAllCategories, (req, res) => {
//   res.json(req.auth);
// });

module.exports = router;
