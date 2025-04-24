import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';

const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [addBook, { isLoading }] = useAddBookMutation();
  const [imageFileName, setImageFileName] = useState('');

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      bookImage: imageFileName, // match schema
    };

    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Book Added",
        text: "Your book has been successfully uploaded!",
        icon: "success",
        confirmButtonColor: "#1e3a8a",
      });
      reset();
      setImageFileName('');
      setImageFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add book. Please try again.", "error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Add New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField label="Title" name="title" placeholder="Enter book title" register={register} />
        <InputField label="Author" name="author" placeholder="Enter author name" register={register} />
        <InputField label="ISBN" name="ISBN" placeholder="Enter ISBN" register={register} />
        <InputField label="Description" name="description" placeholder="Enter description" type="textarea" register={register} />

        {/* Genre / Category */}
        <SelectField
          label="Genre"
          name="genre"
          options={[
            { value: '', label: 'Choose a Genre' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />

        <InputField label="Old Price" name="oldPrice" type="number" placeholder="Enter old price" register={register} />
        <InputField label="New Price" name="newPrice" type="number" placeholder="Enter new price" register={register} />
        <InputField label="Stock" name="stock" type="number" placeholder="Enter stock quantity" register={register} />
        <InputField label="Year Published" name="yearPublished" type="date" register={register} />

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Book Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded-md" />
          {imageFileName && <p className="text-sm text-gray-500 mt-1">Selected: {imageFileName}</p>}
        </div>

        <button type="submit" className="w-full py-2 bg-[#1e3a8a] text-white font-semibold rounded-md hover:bg-blue-900 transition">
          {isLoading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
