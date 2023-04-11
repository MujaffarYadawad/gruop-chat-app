const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Routes
const userRoutes = require('./routes/user')
const messageRoutes = require('./routes/message')
const groupRoutes = require('./routes/group')

app.use(bodyParser.json({extended :false}))
app.use(cors());

const sequelize = require('./util/database');

// Models
const User = require('./models/user');
const Message = require('./models/message')
const Groups = require("./models/group");
const Usergroup = require("./models/usergroup");

app.use('/user', userRoutes);
app.use('/msg', messageRoutes);
app.use('/group', groupRoutes)

// Relations
// one to many

Message.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Message); 
 
Message.belongsTo(Groups, { constraints: true, onDelete: "CASCADE" });
Groups.hasMany(Message);

//Many to Many
User.belongsToMany(Groups, { through: Usergroup });
Groups.belongsToMany(User, { through: Usergroup });   
 
sequelize
  //.sync({ force: true })
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







