import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RestaurantResult = () => {
    const [restaurant, setRestaurant] = useState([]);
    const { restaurantId } = useParams();

  
    const gettingSearchResults = async () => {
      try {
        const { data } = await axios.get('/restaurant', { params: { restaurantId } });
        console.log(data);
        setRestaurant([data.results[0]]);
        console.log(restaurant);
      } catch (error) {
        alert('There was an error getting the recipe!');
      }
    };

    useEffect(() => {
        gettingSearchResults();
      }, []);

};

export default RestaurantResult;
