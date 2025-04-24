const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware 
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://bookverse-store.vercel.app'],
    credentials: true
}))

app.get("/", (req, res) => {
  res.send("Bookverse store Server is running!");
});
 
// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route")
const userRoutes =  require("./src/users/user.router")
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

// Mongo connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB connected successfully!");
    // Start server after DB connects
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
 
