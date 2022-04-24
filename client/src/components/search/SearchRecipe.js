import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const SearchRecipe = () => {
  const [recipeRecommendations, setRecipeRecommendations] = useState([]);
  const { restaurantName, rating, prepTime } = useParams();

  const navigate = useNavigate();

  const gettingSearchResults = async () => {
    try {
      const { data } = await axios.get('/searchRecipes', { params: { restaurantName, rating, prepTime } });
      setRecipeRecommendations(data.results);
    } catch (error) {
      alert('There was an error getting recipe recommendations!');
    }
  };

  useEffect(() => {
    gettingSearchResults();
  }, []);

  const rows = Math.ceil(recipeRecommendations.length / 4);
  // const active = 1;
  // let items = [];
  // for (let number = 1; number <= 5; number++) {
  //   items.push(
  //     <Pagination.Item key={number} active={number === active}>
  //       {number}
  //     </Pagination.Item>,
  //   );
  // }

  return (
    <>
      <Container>
        <h1>{`Recipe Recommendations based on "${restaurantName}"`}</h1>
        <hr />
        {Array(rows)
          .fill()
          .map((_, rowIndex) => (
            <Row key={uuidv4()} className='mt-4' xs={4}>
              {recipeRecommendations.slice(rowIndex * 4, rowIndex * 4 + 4).map((result) => (
                <Col key={uuidv4()}>
                  <Card key={uuidv4()} style={{ width: '18rem', height: '30rem' }}>
                    <Card.Img variant='top' src={result.imageLink} style={{ height: '18rem', width: '18rem' }} />
                    <Card.Body>
                      <Card.Title>{result.recipeName}</Card.Title>
                      <Card.Text>Rating: {result.recipeRating}</Card.Text>
                      <Card.Text>Prep Time: {result.totalTime}</Card.Text>
                      <Button variant='primary' onClick={() => navigate(`/recipe/${result.recipe_id}`)}>
                        Check out this recipe!
                      </Button>
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

export default SearchRecipe;
