const express = require("express");
const CustomError = require("../src/CustomError");

const router = express.Router();

// Step 2.2 / 4.1: Demo routes

// GET /success — returns a normal response
router.get("/success", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Everything is working fine!",
    data: { user: "John Doe", role: "admin" },
  });
});

// GET /error — throws a generic 500 custom error
router.get("/error", (req, res, next) => {
  const err = new CustomError("Something went wrong", 500);
  next(err); // pass to error middleware
});

// GET /not-found-resource — throws a 404 custom error
router.get("/not-found-resource", (req, res, next) => {
  const err = new CustomError("The requested resource was not found", 404);
  next(err);
});

// GET /forbidden — throws a 403 custom error
router.get("/forbidden", (req, res, next) => {
  const err = new CustomError("You do not have permission to access this", 403);
  next(err);
});

// GET /bad-request — throws a 400 custom error
router.get("/bad-request", (req, res, next) => {
  const err = new CustomError("Invalid request parameters", 400);
  next(err);
});

// GET /unhandled — simulates an unexpected crash (no CustomError)
router.get("/unhandled", (req, res, next) => {
  throw new Error("Unexpected crash!"); // middleware will still catch this
});

module.exports = router;