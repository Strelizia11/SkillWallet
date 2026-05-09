// Step 2.1: Basic Express Server Setup
const express = require("express");
const demoRoutes = require("./routes/demoRoutes");
const errorMiddleware = require("./src/errorMiddleware");

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// Step 2.2: Mount demo routes
app.use("/", demoRoutes);

// Step 5.2: 404 fallback — catch all unknown routes BEFORE error middleware
app.use((req, res, next) => {
  const { CustomError } = require("./src/CustomError") || require;
  const err = new (require("./src/CustomError"))(
    `Route '${req.method} ${req.originalUrl}' not found`,
    404
  );
  next(err);
});

// Step 3.2: Attach error middleware LAST (after all routes)
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log("\nAvailable test routes:");
  console.log("  GET /success           → 200 OK");
  console.log("  GET /error             → 500 Custom Error");
  console.log("  GET /not-found-resource→ 404 Custom Error");
  console.log("  GET /forbidden         → 403 Custom Error");
  console.log("  GET /bad-request       → 400 Custom Error");
  console.log("  GET /unhandled         → 500 Unhandled Error");
  console.log("  GET /anything-else     → 404 Unknown Route");
});

module.exports = app;