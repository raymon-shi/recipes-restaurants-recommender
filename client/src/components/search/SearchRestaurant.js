import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const SearchRestaurant = () => {
  const [restaurantRecommendations, setRestaurantRecommendations] = useState([]);
  const { recipeName, state, starRating, reviewCount } = useParams();

  const navigate = useNavigate();

  const gettingSearchResults = async () => {
    try {
      const { data } = await axios.get('/searchRestaurants', { params: { recipeName, state, starRating, reviewCount } });
      setRestaurantRecommendations(data.results);
    } catch (error) {
      alert('There was an error getting restaurant recommendations!');
    }
  };

  useEffect(() => {
    gettingSearchResults();
  }, []);

  const rows = Math.ceil(restaurantRecommendations.length / 4);
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
        <h1>Restaurant Recommendations based on: </h1>
        <h2>{`Name: ${recipeName}`}</h2>
        <h2>{`State: ${state}`}</h2>
        <h2>{`Minimum Star Rating: ${starRating} / 5`}</h2>
        <h2>{`Minimum Reviews: ${reviewCount} reviews`}</h2>
        <hr />
        {Array(rows)
          .fill()
          .map((_, rowIndex) => (
            <Row key={uuidv4()} className="mt-4" xs={4}>
              {restaurantRecommendations.slice(rowIndex * 4, rowIndex * 4 + 4).map((result) => (
                <Col key={uuidv4()}>
                  <Card key={uuidv4()} style={{ width: '18rem', height: '25rem' }}>
                    <Card.Body>
                      <Card.Title>{result.name}</Card.Title>
                      <Card.Text>Category: {result.category}</Card.Text>
                      <Card.Text>Address: {`${result.address}, ${result.city} ${result.state}`}</Card.Text>
                      <Card.Text>Rating: {result.rating}</Card.Text>
                      <Card.Text>Review Count: {result.review_count}</Card.Text>
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

export default SearchRestaurant;
