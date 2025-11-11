import React from 'react';
import Banner from './Banner';
import TopSellers from './TopSellers';
import Recommended from './Recommended';
import News from './News';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopSellers></TopSellers>
      <Recommended></Recommended>
      <News></News>
    </div>
  );
};

export default Home;
