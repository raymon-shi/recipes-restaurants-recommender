import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const SearchPresetRestaurant = () => {
  const [restaurantRecommendations, setRestaurantRecommendations] = useState([]);
  const { preset } = useParams();

  const navigate = useNavigate();

  const gettingSearchResultsRestaurantsRecipesPerCity = async () => {
    try {
      const { data } = await axios.get('/searchPresetRestaurantsRecipePerCity');
      setRestaurantRecommendations(data.results);
    } catch (error) {
      alert('There was an error getting restaurant recommendations!');
    }
  };

  const gettingSearchResultsRestaurantsPerCity = async () => {
    try {
      const { data } = await axios.get('/searchPresetRestaurantsBestPerCity');
      setRestaurantRecommendations(data.results);
    } catch (error) {
      alert('There was an error getting restaurant recommendations!');
    }
  };

  const gettingSearchResultsRestaurantsPerState = async () => {
    try {
      const { data } = await axios.get('/searchPresetRestaurantsBestPerState');
      setRestaurantRecommendations(data.results);
    } catch (error) {
      alert('There was an error getting restaurant recommendations!');
    }
  };

  useEffect(() => {
    if (preset === 'Best-Restaurant-Recipe-Per-City') {
      gettingSearchResultsRestaurantsRecipesPerCity();
    }
    if (preset === 'Best-Restaurant-Per-City') {
      gettingSearchResultsRestaurantsPerCity();
    }
    if (preset === 'Best-Restaurant-Per-State') {
      gettingSearchResultsRestaurantsPerState();
    }
  }, []);

  const rows = Math.ceil(restaurantRecommendations.length / 4);

  return (
    <>
      <Container>
        <h1>Restaurant Recommendations based on: </h1>
        <h2>{`Preset: ${preset}`}</h2>
        <hr />
        {Array(rows)
          .fill()
          .map((_, rowIndex) => (
            <Row key={uuidv4()} className="mt-4" xs={4}>
              {restaurantRecommendations.slice(rowIndex * 4, rowIndex * 4 + 4).map((result) => (
                <Col key={uuidv4()}>
                  {console.log(result)}
                  <Card key={uuidv4()} style={{ width: '18rem', height: '30rem' }}>
                    <Card.Body>
                      <Card.Title>{result.name}</Card.Title>
                      <Card.Text>Category: {result.category}</Card.Text>
                      <Card.Text>Address: {`${result.address}, ${result.city} ${result.state}`}</Card.Text>
                      <Card.Text>Rating: {result.rating}</Card.Text>
                      <Card.Text>Review Count: {result.review_count}</Card.Text>
                      {preset === 'Best-Restaurant-Recipe-Per-City' ? (
                        <>
                          <Card.Text>Best Recipe: {result.recipe_name}</Card.Text>
                          <Card.Text>Best Recipe Cusine: {result.cuisine}</Card.Text>
                        </>
                      ) : null}
                      <Button variant="primary" onClick={() => navigate(`/restaurant/${result.restaurant_id}`)}>
                        Check out this restaurant!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ))}
        <hr />
      </Container>
    </>
  );
};

export default SearchPresetRestaurant;
