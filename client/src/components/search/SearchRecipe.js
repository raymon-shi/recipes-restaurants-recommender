import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const SearchRecipe = () => {
  const [recipeRecommendations, setRecipeRecommendations] = useState([]);
  const { restaurantName, ingredients, rating, prepTime } = useParams();

  const navigate = useNavigate();

  var userData = JSON.parse(localStorage.getItem('userInfo'));
  var userID;
  if (localStorage.getItem("loggedIn")) {
    userID = userData[0]["id"];
  } else {
    userID = -1;
  }
  

  const gettingSearchResults = async () => {
    try {
      const { data } = await axios.get('/searchRecipes', { params: { restaurantName, ingredients, rating, prepTime } });
      setRecipeRecommendations(data.results);
    } catch (error) {
      alert('There was an error getting recipe recommendations!');
    }
  };

  useEffect(() => {
    gettingSearchResults();
  }, []);

const toSave = async (recipeID) => {
    console.log(userID);
    console.log(recipeID);
    try {
      if (userID < 0) throw "logged out";
      await axios.post('/toSave', {
        userID: userID, 
        recipeID: recipeID
      })
      .then((response) => {
        console.log(response);
        alert('Recipe saved')
      });
    } catch (error) {
      console.log(error);
      alert('Must be logged in to save recipes');
    }
  };

  const rows = Math.ceil(recipeRecommendations.length / 4);

  return (
    <>
      <Container>
        <h1>Recipe Recommendations based on: </h1>
        <h2>{`Name: ${restaurantName}`}</h2>
        <h2>{`Ingredients: ${ingredients}`}</h2>
        <h2>{`Minimum Recipe Rating: ${rating} / 5`}</h2>
        <h2>{`Maximum Preptime: ${prepTime} minutes`}</h2>
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
                      <Button variant="primary" onClick={() => navigate(`/recipe/${result.recipe_id}`)}>
                        Check out this recipe!
                      </Button>
                      <Button variant="success" onClick={() => toSave(result.recipe_id)}>Save this recipe!</Button>
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

export default SearchRecipe;
