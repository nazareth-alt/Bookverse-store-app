import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [addBook, { isLoading }] = useAddBookMutation();
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    // Upload image to backend
    const uploadImage = async () => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await fetch('/api/books/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.imagePath;
    };

    // Submit form data
    const onSubmit = async (data) => {
        try {
            const imagePath = await uploadImage();
            if (!imagePath) throw new Error('Image upload failed');

            const newBookData = {
                ...data,
                bookImage: imagePath, // Add uploaded image path
            };

            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Book added",
                text: "Your book has been added successfully!",
                icon: "success",
                confirmButtonText: "OK"
            });
            reset();
            setImagePreview('');
            setImageFile(null);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to add book. Please check all fields and try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                    required
                />
                <InputField
                    label="Author"
                    name="author"
                    placeholder="Enter author name"
                    register={register}
                    required
                />
                <InputField
                    label="ISBN"
                    name="ISBN"
                    placeholder="Enter ISBN number"
                    register={register}
                    required
                />
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                    required
                />
                <SelectField
                    label="Genre"
                    name="genre"
                    options={[
                        { value: '', label: 'Select Genre' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                    register={register}
                    required
                />
                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Enter old price"
                    register={register}
                />
                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="Enter new price"
                    register={register}
                    required
                />
                <InputField
                    label="Stock"
                    name="stock"
                    type="number"
                    placeholder="Enter stock quantity"
                    register={register}
                    required
                />
                <InputField
                    label="Year Published"
                    name="yearPublished"
                    type="date"
                    register={register}
                />
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="mb-2 w-full"
                        onChange={handleImageChange}
                        required
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Selected Cover"
                            className="w-32 h-32 object-cover rounded"
                        />
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
                >
                    {isLoading ? 'Adding...' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

export default AddBook;




