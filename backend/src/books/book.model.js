const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author:  {
        type: String,
        required: true,
    },
    bookImage:  {
        type: String,
        required: true,
    },
    ISBN: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true,
    },
    oldPrice: Number,
    newPrice: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    yearPublished: {
        type: Date,
        default: Date.now,
    }
  }, {
    timestamps: true,
  });

  const Book = mongoose.model('Book', bookSchema);

  module.exports = Book;