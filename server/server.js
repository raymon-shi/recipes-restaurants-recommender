const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const routes = require('./routes')
const config = require('./config.json');

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

app.get('/login/confirm', routes.userExist)


app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
