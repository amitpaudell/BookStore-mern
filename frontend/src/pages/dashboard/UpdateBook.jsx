import React, { useEffect, useState } from 'react';
import InputField from '../../pages/dashboard/InputField';
import SelectField from '../../pages/dashboard/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseURL from '../../utils/baseURL';
import {
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} from '../../redux/features/books/booksApi';

const UpdateBook = () => {
  const { id } = useParams();
  const {
    data: bookData,
    isLoading,
    isError,
    refetch,
  } = useFetchBookByIdQuery(id);
  // console.log(bookData)

  const [imageloading, setImageLoading] = useState(false);
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

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

  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData?.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage);
      setImage(bookData.coverImage);
      setImagePreview(bookData.coverImage);
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: image,
    };
    try {
      await axios.put(`${getBaseURL()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: 'Book Updated',
        text: 'Your book is updated successfully!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes, It's Okay!",
      });
      await refetch();
    } catch (error) {
      console.log('Failed to update book.');
      alert('Failed to update book.');
    }
  };
  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching book data</div>;
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
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
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />
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
          {imageloading ? 'Uploading' : ' '}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
