import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const SearchPresetRecipe = () => {
  const [recipeRecommendations, setRecipeRecommendations] = useState([]);
  const { preset } = useParams();

  const navigate = useNavigate();

  const gettingSearchResultsRecipesBestPerCuisine = async () => {
    try {
      const { data } = await axios.get('/searchPresetRecipeBestPerCuisine');
      setRecipeRecommendations(data.results);
    } catch (error) {
      alert('There was an error getting recipe recommendations!');
    }
  };

  const gettingSearchResultsRecipesBestAboveAverage = async () => {
    try {
      const { data } = await axios.get('/searchPresetRecipeBestAboveAverage');
      setRecipeRecommendations(data.results);
    } catch (error) {
      console.log(error);
      alert('There was an error getting recipe recommendations!');
    }
  };

  const gettingSearchResultsRecipesBestHighestRating = async () => {
    try {
      const { data } = await axios.get('/searchPresetRecipeBestHighestRating');
      setRecipeRecommendations(data.results);
    } catch (error) {
      alert('There was an error getting recipe recommendations!');
    }
  };

  const gettingSearchResultsRecipesBestLowestRating = async () => {
    try {
      const { data } = await axios.get('/searchPresetRecipeBestLowestRating');
      setRecipeRecommendations(data.results);
    } catch (error) {
      alert('There was an error getting recipe recommendations!');
    }
  };

  useEffect(() => {
    if (preset === 'Best-Recipes-Per-Cuisine') {
      gettingSearchResultsRecipesBestPerCuisine();
    }
    if (preset === 'Best-Recipes-Above-Average') {
      gettingSearchResultsRecipesBestAboveAverage();
    }
    if (preset === 'Best-Recipes-Highest-Rating') {
      gettingSearchResultsRecipesBestHighestRating();
    }
    if (preset === 'Best-Recipes-Lowest-Rating') {
      gettingSearchResultsRecipesBestLowestRating();
    }
  }, []);

  const rows = Math.ceil(recipeRecommendations.length / 4);

  return (
    <>
      <Container>
        <h1>Recipe Recommendations based on: </h1>
        <h2>{`Preset: ${preset}`}</h2>
        <hr />
        {Array(rows)
          .fill()
          .map((_, rowIndex) => (
            <Row key={uuidv4()} className="mt-4" xs={4}>
              {recipeRecommendations.slice(rowIndex * 4, rowIndex * 4 + 4).map((result) => (
                <Col key={uuidv4()}>
                  <Card key={uuidv4()} style={{ width: '18rem', height: '30rem' }}>
                    <Card.Img variant="top" src={result.imageLink} style={{ height: '18rem', width: '18rem' }} />
                    <Card.Body>
                      <Card.Title>{result.recipeName}</Card.Title>
                      <Card.Text>Rating: {result.recipeRating}</Card.Text>
                      <Card.Text>Prep Time: {result.totalTime}</Card.Text>
                      {preset === 'Best-Recipes-Per-Cuisine' ? <Card.Text>Cuisine: {result.cuisine}</Card.Text> : null}
                      <Button variant="primary" onClick={() => navigate(`/recipe/${result.recipe_id}`)}>
                        Check out this recipe!
                      </Button>
                      <Button variant="success">Save this recipe!</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ))}
        <hr />
        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            {items}
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div> */}
      </Container>
    </>
  );
};

export default SearchPresetRecipe;
