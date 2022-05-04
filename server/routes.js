const mysql = require('mysql');
const express = require('express');
const config = require('./config.json');

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
});
connection.connect();

const get = async (req, res) => {
  console.log('top');
  console.log(req.session.email + ' ' + ' /getmethod');
  res.send({ email: req.session.email });
};

const logout = async (req, res) => {
  console.log('HELLLO');
  req.session.email = undefined;
  console.log(req.session.email);
  res.send(req.session.email);
};

const userExist = async (req, res) => {
  const { body } = req;
  const { email } = body;
  const { password } = body;

  connection.query(
    `SELECT id
        FROM User 
        WHERE email = '${email}' AND password = '${password}'`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        console.log(results);
        req.session.email = email;
        res.json({ results: results });
      }
    },
  );
};

const getUserCount = async (req, res) => {
  connection.query(
    `SELECT COUNT(id)
        FROM User`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    },
  );
};

const addUser = async (req, res) => {
  const { body } = req;
  const { email, firstName, lastName, password, dob, id } = body;
  const preferences = 'None';
  console.log(`${typeof email} | ${firstName} | ${lastName} | ${password} | ${dob} | ${id}`);

  connection.query(
    `INSERT INTO User VALUES (${id}, '${firstName}', '${lastName}', '${password}', '${dob}', '${email}', '${preferences}');`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    },
  );
};

const searchGetRecipeRecommendations = async (req, res) => {
  const { query } = req;
  const { restaurantName, rating, prepTime } = query;

  if (restaurantName && rating && prepTime) {
    connection.query(
      `
    WITH restID AS (
      SELECT restaurant_id
      FROM Restaurants R
      WHERE R.name LIKE '%${restaurantName}%'
      LIMIT 1
    ),
    restCategories AS (
    SELECT RC.category
    FROM Restaurant_Categories RC JOIN restID RID ON RC.restaurant_id = RID.restaurant_id
    ),
    recipeWithSameCuisine AS (
        SELECT RC.recipe_id
        FROM Cuisines RC JOIN restCategories RTC ON RC.cuisine LIKE CONCAT('%', RTC.category, '%')
    ),
    recipeRecommendations AS (
      SELECT R.recipe_id as recipe_id, R.totalTime as totalTime, R.name as recipeName, R.rating AS recipeRating
      FROM recipeWithSameCuisine RWSC JOIN Recipes R ON RWSC.recipe_id = R.recipe_id
      WHERE R.totalTime <= ${parseInt(prepTime, 10)} AND R.rating >= ${parseInt(rating, 10)}
    )
    SELECT RR.recipe_id AS recipe_id, RR.recipeName AS recipeName, RR.totalTime AS totalTime, RR.recipeRating as recipeRating, I.images AS imageLink
    FROM Images I JOIN recipeRecommendations RR ON I.recipe_id = RR.recipe_id
    `,
      (error, results, fields) => {
        if (error) {
          res.json({ error });
        } else if (results) {
          res.json({ results });
        }
      },
    );
  }
};

const searchGetRestaurantRecommendations = async (req, res) => {
  const { query } = req;
  const { recipeName, starRating, reviewCount } = query;

  if (recipeName && starRating && reviewCount) {
    connection.query(
      `
    WITH recipeID AS (
        SELECT recipe_id
        FROM Recipes R
        WHERE R.name LIKE '%${recipeName}%'
    ),
    recipeCuisines AS (
        SELECT DISTINCT C.cuisine
        FROM recipeID RID JOIN Cuisines C ON RID.recipe_id = C.recipe_id
    ),
    restCategories AS (
        SELECT DISTINCT RTC.restaurant_id, RTC.category
        FROM recipeCuisines RC JOIN Restaurant_Categories RTC ON RC.cuisine LIKE CONCAT('%', RTC.category, '%')
    )
    SELECT DISTINCT R.restaurant_id, R.name, R.address, R.city, R.state, R.rating, R.review_count, RC.category
    FROM restCategories RC JOIN Restaurants R ON RC.restaurant_id = R.restaurant_id
    WHERE RC.category != 'Food' AND R.rating >= ${parseInt(starRating, 10)} AND R.review_count >= ${parseInt(reviewCount, 10)}
    `,
      (error, results, fields) => {
        if (error) {
          res.json({ error });
        } else if (results) {
          console.log(results.length);
          res.json({ results });
        }
      },
    );
  }
};

module.exports = {
  searchGetRecipeRecommendations,
  searchGetRestaurantRecommendations,
  userExist,
  addUser,
  getUserCount,
  get,
  logout,
};
