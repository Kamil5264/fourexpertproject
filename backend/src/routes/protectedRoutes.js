 const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/dashboard", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to the dashboard",
    data: {
      user: req.user
    }
  });
});

module.exports = router;
