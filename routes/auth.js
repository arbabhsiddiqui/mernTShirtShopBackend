const express = require("express");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router.post(
  "/signup",
  [
    check("name").isLength({ min: 2 }).withMessage("please enter a valid name"),
    check("email").isEmail().withMessage("please enter a valid email"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("password should me attest 3 char long"),
  ],

  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("please enter a valid email"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("password should me attest 3 char long"),
  ],

  signin
);

router.get("/signout", signout);

// test
// router.get("/test", isSignedIn, (req, res) => {
//   res.json(req.auth);
// });

module.exports = router;
