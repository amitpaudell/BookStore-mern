import React, { useState } from 'react';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { IoMdSearch } from 'react-icons/io';
import { HiOutlineUser } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import avatarImg from '../assets/avatar.png';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
const navigations = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Orders', href: '/orders' },
  {
    name: 'Cart Page',
    href: '/cartpage',
  },
  { name: 'Check Out', href: '/checkout' },
];

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="max-w-screen-2xl  mx-auto px-4 py-6 ">
      <nav className="flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center md:gap-16 gap-4">
          {/* Hamburger */}

          <NavLink to="/">
            <HiBars3CenterLeft className="size-6" />
          </NavLink>

          {/* Search Input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoMdSearch className="absolute inline-block left-3 inset-y-2" />

            <input
              type="text"
              placeholder="Search-here"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none "
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser ? 'ring-2 ring-blue-500' : ''
                    }`}
                  />
                </button>

                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40 ">
                    <ul className="py-2 ">
                      {navigations.map((item) => {
                        return (
                          <li
                            key={item.name}
                            onClick={() => setIsDropDownOpen(false)}
                          >
                            <NavLink
                              to={item.href}
                              className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        );
                      })}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <NavLink to="/login">
                <HiOutlineUser className="size-6" />
              </NavLink>
            )}
          </div>

          <button className="hidden sm:block">
            <HiOutlineHeart className="size-6 " />
          </button>

          <NavLink
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <HiOutlineShoppingCart className="" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1 ">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1 ">0</span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
