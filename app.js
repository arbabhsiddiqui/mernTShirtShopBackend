const mongoose = require("mongoose");
const express = require("express");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

// my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

// database connection
mongoose.connect(process.env.DATABASE).then(() => {
  console.log("DB CONNECTED");
});

// middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// my route

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// port
const port = process.env.PORT || 8000;

// server start
app.listen(port, () => {
  console.log(`this app is running on port number: ${port}`);
});
