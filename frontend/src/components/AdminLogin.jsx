import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import getBaseURL from '../utils/baseURL';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${getBaseURL()}/api/auth/admin`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const auth = response.data;
      console.log(auth);

      if (auth.token) {
        localStorage.setItem('token', auth.token);
        setTimeout(() => {
          localStorage.removeItem('token');
          alert('Token has been expired, Please login again');
          navigate('/');
        }, 3600 * 1000);
      }
      alert('Admin login sucessful');
      navigate('/dashboard');
      // navigate('/');
    } catch (error) {
      setMessage('Please provide valid email and password');
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...register('username', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register('password', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>

          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          <div className="flex flex-wrap space-y-2.5 items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
