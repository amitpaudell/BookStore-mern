import React, { useEffect, useState } from 'react';

const categories = [
  'Choose a genere',
  'Adventure',
  'Business',
  'Fiction',
  'Horror',
];
const TopSellers = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Choose a genere');
  useEffect(() => {
    const fetchAllBooks = async () => {
      const response = await fetch('books.json');
      const data = await response.json();
      setBooks(data);
    };
    fetchAllBooks();
  }, []);

  const filteredBooks =
    selectedCategory === 'Choose a genere'
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );
  console.log(filteredBooks);
  return (
    <div className="py-10 ">
      {/* Top Sellers Section */}
      <h2 className="text-3xl font-semibold mb-6 ">Top Sellers</h2>
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#eaeaea] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default TopSellers;
