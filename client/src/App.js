import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './pages/Login';
import NavHeader from './components/home/NavHeader';
import SearchRecipe from './components/search/SearchRecipe';
import SearchRestaurant from './components/search/SearchRestaurant';
import RecipeResult from './components/recipe/recipe';
import { Container } from 'react-bootstrap';
import SearchPresetRestaurant from './components/search/SearchPresetRestaurant'
import SearchPresetRecipe from './components/search/SearchPresetRecipe'
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
          {/* localhost:3000/login will be the route for login */}
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/searchRecipe/:restaurantName/:ingredients/:rating/:prepTime' element={<SearchRecipe />} />
          <Route exact path='/searchRestaurant/:recipeName/:state/:starRating/:reviewCount' element={<SearchRestaurant />} />
          <Route exact path='/searchPresetRestaurant/:preset' element={<SearchPresetRestaurant />} />
          <Route exact path='/searchPresetRecipe/:preset' element={<SearchPresetRecipe />} />
          <Route exact path='/recipe/:recipeId' element={<RecipeResult />}/>
          <Route exact path='/restaurant/:restaurantId' element={<RestaurantResult />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
