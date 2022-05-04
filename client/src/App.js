import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './pages/Login';
import Blogs from './pages/Blogs';
import Account from './pages/Account';
import NavHeader from './components/home/NavHeader';
import SearchRecipe from './components/search/SearchRecipe';
import SearchRestaurant from './components/search/SearchRestaurant';
import { Container } from 'react-bootstrap';

const App = () => {
  const [state, setState] = useState('');
  return (
    <>
      <Container>
        <NavHeader />
      </Container>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          {/* localhost:3000/login will be the route for login */}
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/account' element={<Account />} />
          <Route exact path='/blogs' element={<Blogs />} />
          <Route exact path='/searchRecipe/:restaurantName/:rating/:prepTime' element={<SearchRecipe />} />
          <Route exact path='/searchRestaurant/:recipeName/:starRating/:reviewCount' element={<SearchRestaurant />} />
          <Route exact path='/recipe/:recipeID' />
          <Route exact path='/restaurant/:restaurantID' />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
