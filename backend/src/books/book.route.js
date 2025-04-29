const express = require('express');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');

const router = express.Router();

// Routes

// POST a new book
router.post("/create-book", verifyAdminToken, postABook);

// GET all books
router.get("/", getAllBooks);

// GET single book
router.get("/:id", getSingleBook);

// PUT update a book
router.put("/edit/:id", verifyAdminToken, UpdateBook);

// DELETE a book
router.delete("/:id", verifyAdminToken, deleteABook);

module.exports = router;
