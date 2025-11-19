import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import { useAddBookMutation } from '../../redux/features/books/booksApi';

const AddBook = () => {
  const [imageloading, setImageLoading] = useState(false);
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addBook, { isLoading, isError }] = useAddBookMutation();

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      coverImage: image,
    };
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: 'Book added',
        text: 'Your book is uploaded successfully!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes, It's Okay!",
      });
      reset();
    } catch (error) {
      console.error(error);
      alert('Failed to add book. Please try again.');
    }
  };

  //Handling a image file input

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Create preview URL immediately
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);

    setImageLoading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'construction');
    data.append('cloud_name', 'dpb8lbskr');

    const res = await fetch(
      ' https://api.cloudinary.com/v1_1/dpb8lbskr/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    const uploadedImageURL = await res.json();
    setImage(uploadedImageURL.url);
    setImageLoading(false);
  };

  // Function to remove image preview
  const removeImagePreview = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview('');
    setImage('');
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]');

    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
            // Add more options as needed
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        {/* Cover Image Upload */}
        {/* Image Preview */}
        {imagePreview && (
          <div className="relative inline-block mb-5">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={removeImagePreview}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? (
            <span className="">Adding.. </span>
          ) : (
            <span>Add Book</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
