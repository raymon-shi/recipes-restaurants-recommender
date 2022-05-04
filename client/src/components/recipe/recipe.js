import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeResult = () => {
    const [recipe, setRecipe] = useState([]);
    var ingredientsList = [];
    const { recipeId } = useParams();
    const [ingredients, setIngredients] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [time, setTime] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [media, setMedia] = useState('');

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
          <h1 style={{ alignSelf:'center' }}>{name}</h1>
          <img style={{ alignSelf:'center' }} className="item-image" src={media} alt="product" />
          <p className="item-text">Recipe ID: {id}</p>
          <p className="item-text">Rating: {rating}</p>
          <p className="item-text">Total Time: {time}</p>
          <p className="item-text">Cuisine: {cuisine}</p>
          <p className="item-text">Ingredients: {ingredients}</p>
        </div>
    </div>
    );
};

export default RecipeResult;
