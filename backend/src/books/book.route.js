const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const multer = require('multer');
const path = require('path');

const router =  express.Router();


// frontend => backend server => controller => book schema  => database => send to server => back to the frontend
//post = when submit something fronted to db
// get =  when get something back from db
// put/patch = when edit or update something
// delete = when delete something

// Configure Multer to store files in the 'uploads/' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory where files are saved
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Save with unique filename
  },
});

const upload = multer({ storage })

// Image upload endpoint
router.post('/upload', upload.single('image'), (req, res) => {
  try {
      res.status(200).json({ imagePath: `/uploads/${req.file.filename}` });
  } catch (error) {
      res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
});

// post a book
router.post("/create-book", verifyAdminToken, postABook);

// get all books 
router.get("/", getAllBooks);

// single book endpoint
router.get("/:id", getSingleBook);

// update a book endpoint
router.put("/edit/:id", verifyAdminToken, UpdateBook);

// delete a book endpoint
router.delete("/:id", verifyAdminToken, deleteABook)


module.exports = router; 