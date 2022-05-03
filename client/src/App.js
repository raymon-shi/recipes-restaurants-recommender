import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import NavHeader from './components/home/NavHeader';
import SearchRecipe from './components/search/SearchRecipe';
import SearchRestaurant from './components/search/SearchRestaurant';
import RecipeResult from './components/recipe/recipe';
import { Container } from 'react-bootstrap';
import RestaurantResult from './components/restaurant/restaurant';

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
          <Route exact path='/searchRecipe/:restaurantName/:rating/:prepTime' element={<SearchRecipe />} />
          <Route exact path='/searchRestaurant/:recipeName/:starRating/:reviewCount' element={<SearchRestaurant />} />
          <Route exact path='/recipe/:recipeId' element={<RecipeResult />} />
          <Route exact path='/restaurant/:restaurantId' element={<RestaurantResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
