import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RestaurantResult = () => {
    const { restaurantId } = useParams();
    const categoryList = [];
    const [categories, setCategories] = useState('');
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

  
    const gettingSearchResults = async () => {
      try {
        const { data } = await axios.get('/restaurant', { params: { restaurantId } });
        setRating(data.results[0].rating);
        setCity(data.results[0].city);
        setName(data.results[0].name);
        setAddress(data.results[0].address);
        setReview(data.results[0].review_count);
        setState(data.results[0].state);
        for (let i = 0; i < data.results.length; i++) {
          categoryList.push(data.results[i].category);
        }
        const holder = categoryList.join(", ");
        setCategories(holder);
      } catch (error) {
        alert('There was an error getting the recipe!');
      }
    };

    useEffect(() => {
        gettingSearchResults();
      }, []);

    return (
      <div className="item-container">
        <h1 style={{ textAlign:'center' }}>{name}</h1>
        <div className="item-col" style={{ alignSelf:'center', maxWidth:'350px', margin:'0px auto' }}>
          <p style={{ textAlign:"left", lineHeight:'35px' }}><strong>Restaurant ID: </strong>{restaurantId}
            <br/><strong>Rating: </strong>{rating}
            <br/><strong>Review Count: </strong>{review}
            <br/><strong>Address: </strong>{address} {city}, {state}
            <p><strong>Categories: </strong>{categories}</p>
          </p>
        </div>
      </div>
    );

};

export default RestaurantResult;
