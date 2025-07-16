const express = require("express");
const Bugsnag = require("@bugsnag/js");
const BugsnagPluginExpress = require("@bugsnag/plugin-express");

Bugsnag.start({
  apiKey: "bdcb9a6b28dee1e1bd29fcc0ed09cdb2",
  plugins: [BugsnagPluginExpress],
});

const bugsnagMiddleware = Bugsnag.getPlugin("express");
const app = express();

// Bugsnag middleware
app.use(bugsnagMiddleware.requestHandler);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from DevOps App");
});

// Error route for testing
app.get("/error", (req, res, next) => {
  next(new Error("Test error for Bugsnag"));
});

// Bugsnag error handler
app.use(bugsnagMiddleware.errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
