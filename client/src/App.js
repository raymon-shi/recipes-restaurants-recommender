import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './pages/Login';
import SignInForm from './pages/SignInForm';
import NavHeader from './components/home/NavHeader';
import SearchRecipe from './components/search/SearchRecipe';
import SearchRestaurant from './components/search/SearchRestaurant';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const App = () => {
  return (
    <>
      <Container>
        <NavHeader />
      </Container>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* localhost:3000/login will be the route for login */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignInForm />} />
          <Route exact path="/searchRecipe/:restaurantName/:rating/:prepTime" element={<SearchRecipe />} />
          <Route exact path="/searchRestaurant/:recipeName/:starRating/:reviewCount" element={<SearchRestaurant />} />
          <Route exact path="/recipe/:recipeID" />
          <Route exact path="/restaurant/:restaurantID" />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
