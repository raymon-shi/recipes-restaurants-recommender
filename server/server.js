const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const routes = require('./routes');
const config = require('./config.json');

const app = express();
// const routes = require('./routes');

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));


app.get('/login/getInfo', routes.userInfo)
app.get('/login/confirm', routes.userExist)
app.get('/searchRecipes', routes.searchGetRecipeRecommendations);
app.get('/searchRestaurants', routes.searchGetRestaurantRecommendations);
app.get('/searchPresetRestaurantsRecipePerCity', routes.searchGetBestRestaurantsAndRecipePerCity);
app.get('/searchPresetRestaurantsBestPerCity', routes.searchGetBestRestaurantsPerCity);
app.get('/searchPresetRestaurantsBestPerState', routes.searchGetBestRestaurantsPerState);
app.get('/searchPresetRecipeBestPerCuisine', routes.searchGetBestRecipePerCuisine);
app.get('/searchPresetRecipeBestAboveAverage', routes.searchGetBestRecipeAboveAverage);
app.get('/searchPresetRecipeBestHighestRating', routes.searchGetBestRecipeHighestRating);
app.get('/searchPresetRecipeBestLowestRating', routes.searchGetBestRecipeLowestRating);
app.get('/recipe', routes.recipe);
app.get('/restaurant', routes.restaurant);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
