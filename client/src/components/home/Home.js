import React, { useState } from 'react'
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap'
import NavHeader from './NavHeader'

const Home = () => {
  const [recipeRestaurantName, setRecipeRestaurantName] = useState('')
  const [recipeMeal, setRecipeMeal] = useState({})
  const [recipeRating, setRecipeRating] = useState(1)
  const [recipePrepTime, setRecipePrepTime] = useState(0)
  const [restaurantRating, setRestaurantRating] = useState(1)
  const [restaurantReviewCount, setRestaurantReviewCount] = useState(0)
  const [mode, setMode] = useState('recipes')

  return (
    <Container>
      <h1 className='mb-5' style={{ textAlign: 'center' }}>
        Welcome to the Yelp Recipe-Restaurant Recommender!
      </h1>
      <Tabs id='controlled-tab-example' activeKey={mode} onSelect={(k) => setMode(k)} className='mb-3'>
        <Tab eventKey='recipes' title='Recipes Recommender'>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className='mb-3' controlId='formBasicRestaurant'>
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control type='text' placeholder='Enter a restaurant and get recipe recommendations!' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicMealType'>
              {/* NEED TO ADD ONCHANGE LISTENERS TO CHECKMARKS! */}
              <Form.Label>Meal</Form.Label>
              <Form.Check type='checkbox' id='default-checkbox-1' label='Breakfast' />
              <Form.Check type='checkbox' id='default-checkbox-2' label='Lunch' />
              <Form.Check type='checkbox' id='default-checkbox-3' label='Dinner' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicRating'>
              <Form.Label>Rating (Minimum)</Form.Label>
              <Form.Check type='radio' name='rating' id='default-radio-1' label='1' value='1' onChange={(e) => setRecipeRating(e.target.value)} />
              <Form.Check type='radio' name='rating' id='default-radio-2' label='2' value='2' onChange={(e) => setRecipeRating(e.target.value)} />
              <Form.Check type='radio' name='rating' id='default-radio-3' label='3' value='3' onChange={(e) => setRecipeRating(e.target.value)} />
              <Form.Check type='radio' name='rating' id='default-radio-4' label='4' value='4' onChange={(e) => setRecipeRating(e.target.value)} />
              <Form.Check type='radio' name='rating' id='default-radio-5' label='5' value='5' onChange={(e) => setRecipeRating(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPrep'>
              <Form.Label>Prep Time</Form.Label>
              <Form.Control
                type='number'
                min={0}
                placeholder='Enter the maximum prep time for your recipe'
                value={recipePrepTime}
                onChange={(e) => setRecipePrepTime(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Search
            </Button>
          </Form>
        </Tab>
        <Tab eventKey='restaurants' title='Restaurants Recommender'>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className='mb-3' controlId='formBasicRecipe'>
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control type='text' placeholder='Enter a recipe and get restaurant recommendations!' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicRating'>
              <Form.Label>Star Rating (Minimum)</Form.Label>
              <Form.Check type='radio' name='rating' id='default-radio-1' label='1' value='1' onChange={(e) => setRestaurantRating(e.target.value)} />
              <Form.Check type='radio' name='rating' id='default-radio-2' label='2' value='2' onChange={(e) => setRestaurantRating(e.target.value)} />
              <Form.Check type='radio' name='rating' id='default-radio-3' label='3' value='3' onChange={(e) => setRestaurantRating(e.target.value)} />
              <Form.Check type='radio' name='rating' id='default-radio-4' label='4' value='4' onChange={(e) => setRestaurantRating(e.target.value)} />
              <Form.Check type='radio' name='rating' id='default-radio-5' label='5' value='5' onChange={(e) => setRestaurantRating(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicReviewCount'>
              <Form.Label>Review Count (Minimum)</Form.Label>
              <Form.Control
                type='number'
                min={0}
                placeholder='Enter the minimum amount of reviews for your restaurant!'
                value={restaurantReviewCount}
                onChange={(e) => setRestaurantReviewCount(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Search
            </Button>
          </Form>
        </Tab>
      </Tabs>
      {/* <Row>
        <Col xs={6}>
          <Form.Control
            type='text'
            placeholder='Enter a recipe or restaurant name!'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Select value={searchMode} onChange={(e) => setSearchMode(e.target.value)} required>
            <option value=''>Select a search mode!</option>
            <option value='Recipe'>Recipe</option>
            <option value='Restaurant'>Restaurant</option>
          </Form.Select>
        </Col>
        <Col xs={1}>
          <Button>Search!</Button>
        </Col>
      </Row> */}
    </Container>
  )
}

export default Home
