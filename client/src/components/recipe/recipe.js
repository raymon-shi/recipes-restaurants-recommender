import { useEffect, useState } from 'react';
import { Select } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeResult = () => {
  const { recipeId } = useParams();
  const ingredientsList = new Set();
  const [ingredients, setIngredients] = useState([]);
  const cuisineList = new Set();
  const [cuisines, setCuisines] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [time, setTime] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [media, setMedia] = useState('');
  const [userRating, setUserRating] = useState(1);
  const [userAverage, setUserAverage] = useState(0);
  const [userID, setUserID] = useState(undefined);

  const getRecipeUserAverage = async () => {
    try {
      const { data } = await axios.post('/getAverageUserRating', { recipeId });
      setUserAverage(data.results[0].average);
    } catch (error) {
      alert('There was an error getting user ratings');
    }
  };

  useEffect(() => {
    getRecipeUserAverage();
    const intervalID = setInterval(() => {
      getRecipeUserAverage();
    }, 5000);
    return () => clearInterval(intervalID);
  }, []);

  // const gettingUserId = async () => {
  //   try {
  //     const emailData = await axios.get('/get');
  //     const { data } = emailData;
  //     const { email } = data;
  //     const user = await axios.post('/getUserId', { email });
  //     setUserID(user.data.results[0].id);
  //   } catch (error) {
  //     console.log(error);
  //     alert('there was an error getting userId');
  //   }
  // };

  // useEffect(() => {
  //   gettingUserId();
  // }, []);

  const handleSubmit = async () => {
    try {
      const emailData = await axios.get('/get');
      const { data } = emailData;
      const { email } = data;

      const user = await axios.post('/getUserId', { email });
      const ratingRecipe = await axios.post('/ratingRecipe', { recipeId, userId: user.data.results[0].id, rating: userRating });
      alert('The recipe rating has been updated!');
    } catch (error) {
      alert('There was an error saving rating!');
    }
  };

  const gettingSearchResults = async () => {
    try {
      const { data } = await axios.get('/recipe', { params: { recipeId } });
      setId(data.results[0].ID);
      setRating(data.results[0].rating);
      setTime(data.results[0].totalTime);
      setName(data.results[0].name);
      setMedia(data.results[0].media);

      for (let i = 0; i < data.results.length; i++) {
        ingredientsList.add(data.results[i].ingredient);
        cuisineList.add(data.results[i].cuisine);
      }
      const ingredients1 = Array.from(ingredientsList).join(', ');
      setIngredients(ingredients1);
      const cuisines1 = Array.from(cuisineList).join(', ');
      setCuisine(cuisines1);
    } catch (error) {
      alert('There was an error getting the recipe!');
    }
  };

  useEffect(() => {
    gettingSearchResults();
  }, [recipeId]);

  return (
    <div className="item-container">
      <div className="item-col">
        {userAverage ? (
          <h1 style={{ textAlign: 'center' }}>{`${name} (Average User Rating: ${userAverage})`}</h1>
        ) : (
          <h1 style={{ textAlign: 'center' }}>{`${name} (No User Ratings Yet)`}</h1>
        )}
        <div style={{ marginLeft: '40px' }}>
          <div style={{ display: 'flex' }}>
            <img className="item-image" src={media} alt="product" style={{ marginBottom: '20px' }} />
            <div style={{ marginLeft: '10px' }}>
              <p style={{ lineHeight: '35px' }} className="item-text">
                <strong>Recipe ID: </strong>
                {id}
                <br />
                <strong>Yelp Rating: </strong>
                {rating}
                <br />
                <strong>Total Time: </strong>
                {time}
                <br />
                <strong>Cuisine: </strong>
                {cuisine}
              </p>
            </div>
          </div>
          <p style={{ maxWidth: '800px' }} className="item-text">
            <strong>Ingredients: </strong> {ingredients}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
            <select w="40" variant="filled" onChange={(e) => setUserRating(e.target.value)}>
              <option value="">Ratings</option>
              <option label="1" value="1" />
              <option label="2" value="2" />
              <option label="3" value="3" />
              <option label="4" value="4" />
              <option label="5" value="5" />
            </select>
            <button style={{ marginLeft: '10px' }} type="submit" name="ratingSubmit">
              Rate Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeResult;
