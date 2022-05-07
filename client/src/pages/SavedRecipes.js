import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './Login.css';


const SavedRecipes = () => {
  const [saved, setSaved] = useState([]);
  

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
      const { data } = await axios.get('/getSaved', { params: { userID } });
      setSaved(data.results);
    } catch (error) {
      alert('There was an error getting recipe recommendations!');
    }
  };

  useEffect(() => {
    gettingSearchResults();
  }, []);
  


  const rows = Math.ceil(saved.length / 4);

  return (
    <>
      <Container>
        <h1>Saved recipes: </h1>
        <hr />
        {Array(rows)
          .fill()
          .map((_, rowIndex) => (
            <Row key={uuidv4()} className="mt-4" xs={4}>
              {saved.slice(rowIndex * 4, rowIndex * 4 + 4).map((result) => (
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

export default SavedRecipes;