import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import NavHeader from './NavHeader';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [recipeRestaurantName, setRecipeRestaurantName] = useState('all');
  const [recipeRating, setRecipeRating] = useState(1);
  const [recipePrepTime, setRecipePrepTime] = useState(60);
  const [ingredients, setIngredients] = useState('all');
  const [restaurantRecipeName, setRestaurantRecipeName] = useState('all');
  const [restaurantRating, setRestaurantRating] = useState(1);
  const [restaurantReviewCount, setRestaurantReviewCount] = useState(0);
  const [mode, setMode] = useState('recipes');
  const [currState, setCurrState] = useState('');

  const navigate = useNavigate();

  const states = [
    { name: 'ALL', abbreviation: 'all' },
    { name: 'ALABAMA', abbreviation: 'AL' },
    { name: 'ALASKA', abbreviation: 'AK' },
    { name: 'AMERICAN SAMOA', abbreviation: 'AS' },
    { name: 'ARIZONA', abbreviation: 'AZ' },
    { name: 'ARKANSAS', abbreviation: 'AR' },
    { name: 'CALIFORNIA', abbreviation: 'CA' },
    { name: 'COLORADO', abbreviation: 'CO' },
    { name: 'CONNECTICUT', abbreviation: 'CT' },
    { name: 'DELAWARE', abbreviation: 'DE' },
    { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
    { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM' },
    { name: 'FLORIDA', abbreviation: 'FL' },
    { name: 'GEORGIA', abbreviation: 'GA' },
    { name: 'GUAM', abbreviation: 'GU' },
    { name: 'HAWAII', abbreviation: 'HI' },
    { name: 'IDAHO', abbreviation: 'ID' },
    { name: 'ILLINOIS', abbreviation: 'IL' },
    { name: 'INDIANA', abbreviation: 'IN' },
    { name: 'IOWA', abbreviation: 'IA' },
    { name: 'KANSAS', abbreviation: 'KS' },
    { name: 'KENTUCKY', abbreviation: 'KY' },
    { name: 'LOUISIANA', abbreviation: 'LA' },
    { name: 'MAINE', abbreviation: 'ME' },
    { name: 'MARSHALL ISLANDS', abbreviation: 'MH' },
    { name: 'MARYLAND', abbreviation: 'MD' },
    { name: 'MASSACHUSETTS', abbreviation: 'MA' },
    { name: 'MICHIGAN', abbreviation: 'MI' },
    { name: 'MINNESOTA', abbreviation: 'MN' },
    { name: 'MISSISSIPPI', abbreviation: 'MS' },
    { name: 'MISSOURI', abbreviation: 'MO' },
    { name: 'MONTANA', abbreviation: 'MT' },
    { name: 'NEBRASKA', abbreviation: 'NE' },
    { name: 'NEVADA', abbreviation: 'NV' },
    { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
    { name: 'NEW JERSEY', abbreviation: 'NJ' },
    { name: 'NEW MEXICO', abbreviation: 'NM' },
    { name: 'NEW YORK', abbreviation: 'NY' },
    { name: 'NORTH CAROLINA', abbreviation: 'NC' },
    { name: 'NORTH DAKOTA', abbreviation: 'ND' },
    { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP' },
    { name: 'OHIO', abbreviation: 'OH' },
    { name: 'OKLAHOMA', abbreviation: 'OK' },
    { name: 'OREGON', abbreviation: 'OR' },
    { name: 'PALAU', abbreviation: 'PW' },
    { name: 'PENNSYLVANIA', abbreviation: 'PA' },
    { name: 'PUERTO RICO', abbreviation: 'PR' },
    { name: 'RHODE ISLAND', abbreviation: 'RI' },
    { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
    { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
    { name: 'TENNESSEE', abbreviation: 'TN' },
    { name: 'TEXAS', abbreviation: 'TX' },
    { name: 'UTAH', abbreviation: 'UT' },
    { name: 'VERMONT', abbreviation: 'VT' },
    { name: 'VIRGIN ISLANDS', abbreviation: 'VI' },
    { name: 'VIRGINIA', abbreviation: 'VA' },
    { name: 'WASHINGTON', abbreviation: 'WA' },
    { name: 'WEST VIRGINIA', abbreviation: 'WV' },
    { name: 'WISCONSIN', abbreviation: 'WI' },
    { name: 'WYOMING', abbreviation: 'WY' },
  ];

  return (
    <Container>
      <h1 className="mb-5" style={{ textAlign: 'center' }}>
        Welcome to the Yelp Recipe-Restaurant Recommender!
      </h1>
      <Tabs id="controlled-tab-example" activeKey={mode} onSelect={(k) => setMode(k)} className="mb-3">
        <Tab eventKey="recipes" title="Recipes Recommender">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3" controlId="formBasicRestaurant">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a restaurant and get recipe recommendations!"
                value={recipeRestaurantName}
                onChange={(e) => setRecipeRestaurantName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the ingredients you want in your recipes!"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRating">
              <Form.Label>Rating (Minimum)</Form.Label>
              <Form.Check
                type="radio"
                name="rating"
                id="default-radio-1"
                label="1"
                value="1"
                onChange={(e) => setRecipeRating(e.target.value)}
                required
                defaultChecked
              />
              <Form.Check
                type="radio"
                name="rating"
                id="default-radio-2"
                label="2"
                value="2"
                onChange={(e) => setRecipeRating(e.target.value)}
                required
              />
              <Form.Check
                type="radio"
                name="rating"
                id="default-radio-3"
                label="3"
                value="3"
                onChange={(e) => setRecipeRating(e.target.value)}
                required
              />
              <Form.Check
                type="radio"
                name="rating"
                id="default-radio-4"
                label="4"
                value="4"
                onChange={(e) => setRecipeRating(e.target.value)}
                required
              />
              <Form.Check
                type="radio"
                name="rating"
                id="default-radio-5"
                label="5"
                value="5"
                onChange={(e) => setRecipeRating(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrep">
              <Form.Label>Prep Time</Form.Label>
              <Form.Control
                type="number"
                min={0}
                placeholder="Enter the maximum prep time for your recipe"
                value={recipePrepTime}
                onChange={(e) => setRecipePrepTime(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              // disabled={!recipeRestaurantName || !recipeRating || !recipePrepTime}
              onClick={() => navigate(`/searchRecipe/${recipeRestaurantName}/${ingredients}/${recipeRating}/${recipePrepTime}`)}>
              Get Recipe Recommendations!
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="restaurants" title="Restaurants Recommender">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3" controlId="formBasicRecipe">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a recipe and get restaurant recommendations!"
                value={restaurantRecipeName}
                onChange={(e) => setRestaurantRecipeName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicState'>
              {currState}
              <Form.Label>State</Form.Label>
              <Form.Select value={currState} onChange={(e) => setCurrState(e.target.value)} required>
                <option value=''>State</option>
                {states.map((state) => (
                  <option key={uuidv4()} value={state.abbreviation}>
                    {state.abbreviation}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRating">
              <Form.Label>Star Rating (Minimum)</Form.Label>
              <Form.Check defaultChecked type="radio" name="rating" id="default-radio-1" label="1" value="1" onChange={(e) => setRestaurantRating(e.target.value)} />
              <Form.Check type="radio" name="rating" id="default-radio-2" label="2" value="2" onChange={(e) => setRestaurantRating(e.target.value)} />
              <Form.Check type="radio" name="rating" id="default-radio-3" label="3" value="3" onChange={(e) => setRestaurantRating(e.target.value)} />
              <Form.Check type="radio" name="rating" id="default-radio-4" label="4" value="4" onChange={(e) => setRestaurantRating(e.target.value)} />
              <Form.Check type="radio" name="rating" id="default-radio-5" label="5" value="5" onChange={(e) => setRestaurantRating(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicReviewCount">
              <Form.Label>Review Count (Minimum)</Form.Label>
              <Form.Control
                type="number"
                min={0}
                placeholder="Enter the minimum amount of reviews for your restaurant!"
                value={restaurantReviewCount}
                onChange={(e) => setRestaurantReviewCount(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              // disabled={!restaurantRecipeName || !restaurantRating || !restaurantReviewCount}
              onClick={() => navigate(`/searchRestaurant/${restaurantRecipeName}/${currState}/${restaurantRating}/${restaurantReviewCount}`)}>
              Get Restaurant Recommendations!
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Home;
