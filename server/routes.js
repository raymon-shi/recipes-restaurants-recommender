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

  connection.query(`SELECT id
        FROM User 
        WHERE email = '${email}' AND password = '${password}'`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
}

module.exports = {
  exampleFunction,
  userExist
};
