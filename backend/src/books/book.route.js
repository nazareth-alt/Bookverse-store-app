const express = require('express');
const Book = require('./book.model');
const multer = require('multer');
const path = require('path');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router =  express.Router();

// Multer storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
      }
    
  });
  
  const upload = multer({ storage });

// frontend => backend server => controller => book schema  => database => send to server => back to the frontend
//post = when submit something fronted to db
// get =  when get something back from db
// put/patch = when edit or update something
// delete = when delete something

// post a book
// router.post("/create-book", verifyAdminToken, postABook)

// post a book
router.post("/create-book", verifyAdminToken, upload.single('bookImage'), postABook);



 

// get all books 
router.get("/", getAllBooks);

// single book endpoint
router.get("/:id", getSingleBook);

// update a book endpoint
router.put("/edit/:id", verifyAdminToken, UpdateBook);

// delete a book endpoint
router.delete("/:id", verifyAdminToken, deleteABook)


module.exports = router; 