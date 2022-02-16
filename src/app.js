const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const config = require("./config");
const { handleError } = require("./helpers/error");

// App initialization
const app = express();
// Configurations
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Check/Welcome route
app.get("/", (req, res) => {
  res.send("Hello , Server is Up and Running Please go ahead");
});

// Routes
app.use("/api", routes);

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  if (err.statusCode) handleError(err, res);
  else {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      statusCode: 500,
    });
  }
});

const PORT = config.APP_PORT || 8000;
const HOST = process.env.APP_HOST || "0.0.0.0";

// Starting server
app.listen(PORT, HOST, () => {
  console.log(`Listening  on  ${HOST}:${PORT}`);
});

module.exports = app;
