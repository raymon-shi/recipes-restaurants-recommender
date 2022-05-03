import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeResult = () => {
    const [recipe, setRecipe] = useState([]);
    const { recipeId } = useParams();

    const gettingSearchResults = async () => {
      try {
        const { data } = await axios.get('/recipe', { params: { recipeId } });
        setRecipe([data.results[0]]);
      } catch (error) {
        alert('There was an error getting the recipe!');
      }
    };

    useEffect(() => {
        gettingSearchResults();
      }, []);

};

export default RecipeResult;
