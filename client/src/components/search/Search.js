import React, { useState } from 'react'
import { Card, Container, Row, Col, Button, Pagination } from 'react-bootstrap'

const Search = () => {
  const [hello, setHello] = useState('')
  const data = [
    { name: 'Salad', rating: 5, prepTime: 20, image: 'https://www.cookingclassy.com/wp-content/uploads/2021/03/cobb-salad-18.jpg' },
    { name: 'Salad', rating: 5, prepTime: 20, image: 'https://www.cookingclassy.com/wp-content/uploads/2021/03/cobb-salad-18.jpg' },
    { name: 'Salad', rating: 5, prepTime: 20, image: 'https://www.cookingclassy.com/wp-content/uploads/2021/03/cobb-salad-18.jpg' },
    { name: 'Salad', rating: 5, prepTime: 20, image: 'https://www.cookingclassy.com/wp-content/uploads/2021/03/cobb-salad-18.jpg' },
    {
      name: 'Salad',
      rating: 5,
      prepTime: 20,
      image: 'https://assets.bonappetit.com/photos/5e8cdb60a7a01c00083b08a9/1:1/w_2560%2Cc_limit/HMONG-Potluck-Chopped-Salad.jpg',
    },
    {
      name: 'Salad',
      rating: 5,
      prepTime: 20,
      image: 'https://assets.bonappetit.com/photos/5e8cdb60a7a01c00083b08a9/1:1/w_2560%2Cc_limit/HMONG-Potluck-Chopped-Salad.jpg',
    },
    {
      name: 'Salad',
      rating: 5,
      prepTime: 20,
      image: 'https://assets.bonappetit.com/photos/5e8cdb60a7a01c00083b08a9/1:1/w_2560%2Cc_limit/HMONG-Potluck-Chopped-Salad.jpg',
    },
    {
      name: 'Salad',
      rating: 5,
      prepTime: 20,
      image: 'https://assets.bonappetit.com/photos/5e8cdb60a7a01c00083b08a9/1:1/w_2560%2Cc_limit/HMONG-Potluck-Chopped-Salad.jpg',
    },
    { name: 'Salad', rating: 5, prepTime: 20, image: 'https://www.wellplated.com/wp-content/uploads/2021/05/Healthy-Fruit-Salad.jpg' },
    { name: 'Salad', rating: 5, prepTime: 20, image: 'https://www.wellplated.com/wp-content/uploads/2021/05/Healthy-Fruit-Salad.jpg' },
    { name: 'Salad', rating: 5, prepTime: 20, image: 'https://www.wellplated.com/wp-content/uploads/2021/05/Healthy-Fruit-Salad.jpg' },
  ]
  const rows = Math.ceil(data.length / 4)
  const active = 1
  let items = []
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    )
  }

  return (
    <>
      <Container>
        <h1>Search Results for "Salads"</h1>
        <hr />
        {Array(rows)
          .fill()
          .map((_, rowIndex) => (
            <Row className='mt-4' xs={4}>
              {data.slice(rowIndex * 4, rowIndex * 4 + 4).map((result) => (
                <Col>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant='top' src={result.image} style={{ height: '18rem', width: '18rem' }} />
                    <Card.Body>
                      <Card.Title>{result.name}</Card.Title>
                      <Card.Text>Rating: {result.rating}</Card.Text>
                      <Card.Text>Prep Time: {result.prepTime}</Card.Text>
                      <Button variant='primary'>Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ))}
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            {items}
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>
      </Container>
    </>
  )
}

export default Search
