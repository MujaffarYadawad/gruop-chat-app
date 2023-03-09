const User = require('../models/user');
const Message = require('../models/message')
const jwt = require('jsonwebtoken')

const authenticate  = async (req, res, next) => {

  try {
    const token = req.header("Authorization");
    console.log("token-->", token);

    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("user-->", user);

    const user1 = await User.findByPk(user.id);
    console.log("user1__.", user1);
    //const user1 = await User.findAll({where : {user: user}})
       req.user = user1;

       next();

  } catch (err) {
    console.log(err)
    return res.status(401).json({ success: false });
  }
 
}


module.exports = { authenticate };