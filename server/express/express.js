const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.set("view engine", "ejs");
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || 'localhost');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

module.exports = app;