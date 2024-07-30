require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;
const connectDb = require("./config/dbConn");
const mongoose = require("mongoose");

console.log(process.env.NODE_ENV);

connectDb();
// Middleware setup
app.use(logger); // Custom logger middleware
app.use(cors(corsOptions)); // CORS middleware with options
app.use(express.json()); // Parse incoming JSON payloads
app.use(cookieParser()); // Parse cookies

// Serve static files from the 'public' directory
app.use("/", express.static(path.join(__dirname, "public")));

// Route handling
app.use("/", require("./routes/root")); // Route requests to './routes/root'

app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));

// 404 error handling
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

// Error handling middleware
app.use(errorHandler);

// Start the server
mongoose.connection.once("open", () => {
  console.log("Connected to Mongo DB");
  app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code} \t ${err.syscall} \t ${err.hostname}`,
    "mongoErrlog.log"
  );
});
