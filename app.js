const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const userRoutes = require('./routes/user')

app.use(bodyParser.json({extended :false}))
app.use(cors());

const sequelize = require('./util/database');

const User = require('./models/user');

app.use('/user', userRoutes);
 
sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});






