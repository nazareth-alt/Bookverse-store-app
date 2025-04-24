import React, { useEffect } from 'react'
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useFetchBookByIdQuery } from '../../../redux/features/books/booksApi'
import Loading from '../../../components/Loading'
import Swal from 'sweetalert2'
import axios from 'axios'
import getBaseUrl from '../../../utils/baseURL'

const UpdateBook = () => {
  const { id } = useParams()
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id)
  const { register, handleSubmit, setValue } = useForm()

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title)
      setValue('description', bookData.description)
      setValue('category', bookData.category)
      setValue('author', bookData.author)
      setValue('format', bookData.format)
      setValue('publishedYear', bookData.publishedYear)
      setValue('coverImage', bookData.coverImage)
      setValue('oldPrice', bookData.oldPrice)
      setValue('newPrice', bookData.newPrice)
      setValue('stock', bookData.stock)
      setValue('trending', bookData.trending)
      setValue('bestSeller', bookData.bestSeller)
    }
  }, [bookData, setValue])

  const onSubmit = async (data) => {
    const updatedBook = {
      ...data,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      stock: Number(data.stock),
      publishedYear: Number(data.publishedYear),
    }

    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updatedBook, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })

      Swal.fire({
        title: 'Book Updated',
        text: 'The book details were updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      })

      await refetch()
    } catch (error) {
      console.error('Error updating book:', error)
      Swal.fire('Error', 'Failed to update book.', 'error')
    }
  }

  if (isLoading) return <Loading />
  if (isError) return <div>Error fetching book data.</div>

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField label="Title" name="title" placeholder="Enter book title" register={register} />

        <InputField
          label="Author"
          name="author"
          placeholder="Enter author name"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />

        <SelectField
          label="Format"
          name="format"
          options={[
            { value: '', label: 'Choose Format' },
            { value: 'hardcover', label: 'Hardcover' },
            { value: 'paperback', label: 'Paperback' },
            { value: 'ebook', label: 'E-Book' },
          ]}
          register={register}
        />

        <InputField
          label="Published Year"
          name="publishedYear"
          type="number"
          placeholder="e.g. 2022"
          register={register}
        />

        <InputField
          label="Stock Quantity"
          name="stock"
          type="number"
          placeholder="Stock available"
          register={register}
        />

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          placeholder="Enter image URL"
          register={register}
        />

        <div className="flex gap-4 mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" {...register('trending')} className="rounded text-blue-600" />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>

          <label className="inline-flex items-center">
            <input type="checkbox" {...register('bestSeller')} className="rounded text-blue-600" />
            <span className="ml-2 text-sm font-semibold text-gray-700">Best Seller</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
        >
          Update Book
        </button>
      </form>
    </div>
  )
}

export default UpdateBook
