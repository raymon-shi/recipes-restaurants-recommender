import { useEffect, useState } from 'react';
import {
  Select,
} from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeResult = () => {
    const [recipe, setRecipe] = useState([]);
    const ingredientsList = [];
    const { recipeId } = useParams();
    const [ingredients, setIngredients] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [time, setTime] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [media, setMedia] = useState('');
    const [userRating, setUserRating] = useState(1);
    const [userAverage, setUserAverage] = useState(0);

    const getRecipeUserAverage = async () => {
      try {
        const { data } = await axios.post('/getAverageUserRating', { recipeId })
        setUserAverage(data.results[0].average);
      } catch (error) {
        alert('There was an error getting user ratings');
      }
    };

    useEffect(() => {
      getRecipeUserAverage();
    }, [])

    const handleSubmit = async () => {
      try {
        const emailData  = await axios.get('/get');
        const { data } = emailData
        const { email } = data

        const user = await axios.post('/getUserId', {email});
        const ratingRecipe = await axios.post('/ratingRecipe', { recipeId, userId: user.data.results[0].id, rating: userRating});
      } catch (error) {
        alert('There was an error saving rating!');
      }
    };
    
    const gettingSearchResults = async () => {
      try {
        const { data } = await axios.get('/recipe', { params: { recipeId } });
        setRecipe(data.results);
        setId(data.results[0].ID);
        setRating(data.results[0].rating);
        setTime(data.results[0].totalTime);
        setCuisine(data.results[0].cuisine);
        setName(data.results[0].name);
        setMedia(data.results[0].media);

        for (let i = 0; i < data.results.length; i++) {
          ingredientsList.push(data.results[i].ingredient);
        }
        const ingredients1 = ingredientsList.join(", ");
        setIngredients(ingredients1);

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
          <h1 style={{ textAlign:'center' }}>{`${name} (Average User Rating: ${userAverage})`}</h1>
          <div style={{ marginLeft: '40px' }}>
            <div style={{ alignContent:'center', justifyContent:'left', display:'flex' }}>
              <img className="item-image" src={media} alt="product" style={{ marginBottom: '20px' }} />
              <div style={{ marginLeft:"10px" }}>
                <p className="item-text">Recipe ID: {id}</p>
                <p className="item-text">Yelp Rating: {rating}</p>
                <p className="item-text">Total Time: {time}</p>
                <p className="item-text">Cuisine: {cuisine}</p>
              </div>
            </div>
            <p className="item-text">Ingredients: {ingredients}</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            } }>
              <select w="40" variant="filled" onChange={(e) => setUserRating(e.target.value)}>
                <option value="">Ratings</option>
                <option label="1" value="1" />
                <option label="2" value="2" />
                <option label="3" value="3" />
                <option label="4" value="4" />
                <option label="5" value="5" />
              </select>
              <button style={{ marginLeft:"10px" }}type="submit" name="ratingSubmit">Rate Recipe</button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default RecipeResult;
