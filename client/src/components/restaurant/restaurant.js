import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RestaurantResult = () => {
    const [restaurant, setRestaurant] = useState([]);
    const { restaurantId } = useParams();
    var categoryList = [];
    const [categories, setCategories] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [cuisine, setCuisine] = useState('');

  
    const gettingSearchResults = async () => {
      try {
        const { data } = await axios.get('/restaurant', { params: { restaurantId } });
        setRestaurant(data.results);
        setId(data.results[0].restaurant_id);
        setRating(data.results[0].rating);
        setCity(data.results[0].city);
        setCuisine(data.results[0].cuisine);
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
        <div className="item-col">
          <h1 style={{ alignSelf:'center' }}>{name}</h1>
          <p className="item-text">Restaurant ID: {restaurantId}</p>
          <p className="item-text">Rating: {rating}</p>
          <p className="item-text">Address: {address} {city}, {state}</p>
          <p className="item-text">Review Count: {review}</p>
          <p className="item-text">Categories: {categories}</p>
        </div>
    </div>
    );

};

export default RestaurantResult;
