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

const exampleFunction = async () => {
  console.log('hello world');
};

async function userExist(req, res) {
  const email = req.query.Email;
  const password = req.query.Password;

  connection.query(
    `SELECT id
        FROM User 
        WHERE email = '${email}' AND password = '${password}'`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    },
  );
}

const searchGetRecipeRecommendations = async (req, res) => {
  const { query } = req;
  const { restaurantName, rating, prepTime, ingredients } = query;

  const rName = restaurantName === 'all' ? '' : restaurantName;
  const iList = ingredients === 'all' ? '.*' : ingredients;

  if (restaurantName && rating && prepTime && ingredients) {
    connection.query(
      `
    WITH restID AS (
      SELECT restaurant_id
      FROM Restaurants R
      WHERE R.name LIKE '%${rName}%' OR R.name NOT LIKE '%%'
      LIMIT 500
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
      SELECT R.recipe_id as recipe_id, R.totalTime as totalTime, R.name as recipeName, R.rating AS recipeRating, I.ingredient as ingredient
      FROM recipeWithSameCuisine RWSC 
        JOIN Recipes R ON RWSC.recipe_id = R.recipe_id
        JOIN Ingredients I on R.recipe_id = I.recipe_id
      WHERE R.totalTime <= ${parseInt(prepTime, 10)} AND R.rating >= ${parseInt(rating, 10)} AND I.ingredient REGEXP '${iList}'
    )
    SELECT DISTINCT RR.recipe_id AS recipe_id, RR.recipeName AS recipeName, RR.totalTime AS totalTime, RR.recipeRating as recipeRating, I.images AS imageLink
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
  const { recipeName, state, starRating, reviewCount } = query;

  const rName = recipeName === 'all' ? '' : recipeName;
  const sName = state === 'all' ? '' : state;

  if (recipeName && starRating && reviewCount) {
    connection.query(
      `
    WITH recipeID AS (
        SELECT recipe_id
        FROM Recipes R
        WHERE R.name LIKE '%${rName}%' OR R.name NOT LIKE '%%'
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
    WHERE RC.category != 'Food' AND R.rating >= ${parseInt(starRating, 10)} AND R.review_count >= ${parseInt(
        reviewCount,
        10,
      )} AND R.state LIKE '%${sName}%' OR R.state NOT LIKE '%%'
    ORDER BY R.name
    LIMIT 500
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

const searchGetBestRestaurantsAndRecipePerCity = async (req, res) => {
  connection.query(
    `
      WITH bestRest AS (
        SELECT R.restaurant_id, R.name, R.city, R.address, R.state, R.rating, R.review_count
        FROM Restaurants R
        GROUP BY city
        HAVING MAX(R.rating)
    ),
         bestRec AS (
            SELECT R.recipe_id, R.name, C.cuisine, R.totalTime
            FROM Recipes R JOIN Cuisines C ON R.recipe_id = C.recipe_id
            GROUP BY C.cuisine HAVING MAX(R.rating)
         ),
         bestRestC AS (
            SELECT bestRest.restaurant_id , bestRest.name, bestRest.city, RC.Category, bestRest.address AS address, bestRest.state AS state, bestRest.rating AS rating, bestRest.review_count AS review_count
            FROM bestRest JOIN Restaurant_Categories RC ON bestRest.restaurant_id = RC.restaurant_id
         )
      SELECT DISTINCT bestRestC.restaurant_id AS restaurant_id, bestRestC.name AS name, bestRestC.city AS city, bestRec.name AS recipe_name, bestRec.cuisine AS cuisine, bestRestC.address AS address, bestRestC.state AS state, bestRestC.rating AS rating, bestRestC.review_count AS review_count
      FROM bestRestC JOIN bestRec ON bestRestC.category LIKE CONCAT('%', bestRec.cuisine, '%')
      WHERE bestRec.totalTime <= 60
      ORDER BY bestRestC.city
      `,
    (error, results, fields) => {
      if (error) {
        res.json({ error });
      } else if (results) {
        res.json({ results });
      }
    },
  );
};

const searchGetBestRestaurantsPerCity = async (req, res) => {
  connection.query(
    `
    SELECT R.restaurant_id, R.name, R.city, R.address, R.state, R.rating, R.review_count
    FROM Restaurants R
    GROUP BY city
    HAVING MAX(R.rating)
    ORDER BY R.city
      `,
    (error, results, fields) => {
      if (error) {
        res.json({ error });
      } else if (results) {
        res.json({ results });
      }
    },
  );
};

const searchGetBestRestaurantsPerState = async (req, res) => {
  connection.query(
    `
    SELECT R.restaurant_id, R.name, R.city, R.address, R.state, R.rating, R.review_count
    FROM Restaurants R
    GROUP BY state
    HAVING MAX(R.rating)
    ORDER BY R.state
      `,
    (error, results, fields) => {
      if (error) {
        res.json({ error });
      } else if (results) {
        res.json({ results });
      }
    },
  );
};

const searchGetBestRecipePerCuisine = async (req, res) => {
  connection.query(
    `
    SELECT R.recipe_id AS recipe_id, R.name AS recipeName, R.rating AS recipeRating, R.totalTime AS totalTime, C.cuisine AS cuisine, I.images AS imageLink
    FROM Recipes R
        JOIN Images I on R.recipe_id = I.recipe_id
        JOIN Cuisines C on R.recipe_id = C.recipe_id
    GROUP BY C.cuisine
    HAVING MAX(R.rating)
    ORDER BY R.name
    LIMIT 500
      `,
    (error, results, fields) => {
      if (error) {
        res.json({ error });
      } else if (results) {
        res.json({ results });
      }
    },
  );
};

const searchGetBestRecipeAboveAverage = async (req, res) => {
  connection.query(
    `
    SELECT R.recipe_id AS recipe_id, R.name AS recipeName, R.rating AS recipeRating, R.totalTime AS totalTime, I.images AS imageLink
    FROM Recipes R
        JOIN Images I on R.recipe_id = I.recipe_id
    WHERE R.rating >= (SELECT FLOOR(AVG(R.rating)) FROM Recipes R)
    ORDER BY R.name
    LIMIT 500
      `,
    (error, results, fields) => {
      if (error) {
        res.json({ error });
      } else if (results) {
        res.json({ results });
      }
    },
  );
};

const searchGetBestRecipeHighestRating = async (req, res) => {
  connection.query(
    `
    SELECT R.recipe_id AS recipe_id, R.name AS recipeName, R.rating AS recipeRating, R.totalTime AS totalTime, I.images AS imageLink
    FROM Recipes R
        JOIN Images I on R.recipe_id = I.recipe_id
    WHERE R.rating >= (SELECT MAX(R.rating) FROM Recipes R)
    ORDER BY R.name
    LIMIT 500
      `,
    (error, results, fields) => {
      if (error) {
        res.json({ error });
      } else if (results) {
        res.json({ results });
      }
    },
  );
};

const searchGetBestRecipeLowestRating = async (req, res) => {
  connection.query(
    `
    SELECT R.recipe_id AS recipe_id, R.name AS recipeName, R.rating AS recipeRating, R.totalTime AS totalTime, I.images AS imageLink
    FROM Recipes R
        JOIN Images I on R.recipe_id = I.recipe_id
    WHERE R.rating = (SELECT MIN(R.rating) FROM Recipes R)
    ORDER BY R.name
    LIMIT 500
      `,
    (error, results, fields) => {
      if (error) {
        res.json({ error });
      } else if (results) {
        res.json({ results });
      }
    },
  );
};

module.exports = {
  searchGetRecipeRecommendations,
  searchGetRestaurantRecommendations,
  searchGetBestRestaurantsAndRecipePerCity,
  searchGetBestRestaurantsPerCity,
  searchGetBestRestaurantsPerState,
  searchGetBestRecipePerCuisine,
  searchGetBestRecipeAboveAverage,
  searchGetBestRecipeHighestRating,
  searchGetBestRecipeLowestRating,
  userExist,
};
