const mongoose = require('mongoose');
const express = require('express');
const Order = require('../orders/order.model');
const Book = require('../books/book.model');
const router = express.Router();

// Admin Stats Route
router.get("/", async (req, res) => {
    try {
        // 1. Total number of orders
        const totalOrders = await Order.countDocuments();

        // 2. Total sales (sum of all totalPrice from orders)
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        // 3. Total number of books
        const totalBooks = await Book.countDocuments();

        // 4. Monthly sales breakdown
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    totalSales: { $sum: "$totalPrice" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // 5. Randomly select trending books (5 random books)
        const trendingBooks = await Book.aggregate([{ $sample: { size: 5 } }]);

        // 6. Most recently added book
        const latestBook = await Book.findOne().sort({ createdAt: -1 });

        // Response
        res.status(200).json({
            totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            totalBooks,
            monthlySales,
            trendingBooks,
            latestBook
        });

    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
});

module.exports = router;
