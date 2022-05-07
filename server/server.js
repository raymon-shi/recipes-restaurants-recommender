const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const cookieSession = require('cookie-session');
const routes = require('./routes');
const config = require('./config.json');

const app = express();
// const routes = require('./routes');

// whitelist localhost 3000
app.use(express.json())
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(express.json());




app.use(
  cookieSession({
    name: 'session',
    keys: ['secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
);

app.post('/login', routes.userExist);
app.post('/signup', routes.addUser);
app.post('/logout', routes.logout);
app.get('/signup/id', routes.getUserCount);
app.get('/get', routes.get);
app.get('/login/confirm', routes.userExist);
app.get('/getSaved', routes.getSaved);
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
app.post('/getUserId', routes.getUserId);
app.post('/ratingRecipe', routes.ratingRecipe)
app.post('/getAverageUserRating', routes.getAverageUserRating)

app.post('/toSave', routes.saveRecipe);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
