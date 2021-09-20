const express = require("express");
const router = express.Router();
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getStatus,
  updateStatus,
} = require("../controllers/order");
const { isSignedIn, isAuth, isAdmin } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuth,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

// read
router.get("/order/all/:userId", isSignedIn, isAuth, isAdmin, getAllOrders);

// update status

router.get("/order/status/:userId", isSignedIn, isAuth, isAdmin, getStatus);
router.put(
  "/order/:orderId/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  updateStatus
);

// update

// delete

module.exports = router;
