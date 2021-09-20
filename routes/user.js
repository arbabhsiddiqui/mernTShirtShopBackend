const express = require("express");
const {
  signout,
  signup,
  signin,
  isSignedIn,
  isAuth,
} = require("../controllers/auth");
const {
  getUser,
  getUserById,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuth, getUser);
router.put("/user/:userId", isSignedIn, isAuth, updateUser);
router.get("/orders/user/:userId", isSignedIn, isAuth, userPurchaseList);

module.exports = router;
