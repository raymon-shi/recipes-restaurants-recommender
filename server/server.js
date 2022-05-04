const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const cookieSession = require('cookie-session');
const routes = require('./routes');
const config = require('./config.json');

const app = express();

// whitelist localhost 3000
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
app.get('/searchRecipes', routes.searchGetRecipeRecommendations);
app.get('/searchRestaurants', routes.searchGetRestaurantRecommendations);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
