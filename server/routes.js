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

module.exports = {
  exampleFunction,
};
