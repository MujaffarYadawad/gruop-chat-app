const User = require("../models/user");
const bcrpt = require("bcrypt");
const jwt = require('jsonwebtoken')
const saltRounds = 10;
 
function generateAcceessToken(id, name) {
  return jwt.sign({ id: id, name: name }, "secretKey");
}

exports.postUser = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const password = req.body.password;

  try {
    bcrpt.hash(password, saltRounds, async (err, hash) => {
      const response = await User.findAll({ where: { email: email } });
      
      if (response.length === 0) {
        await User.create({
          name: name,
          email: email,
          phonenumber: phonenumber,
          password: hash,
        });
        res.json({ alreadyexisting: false });
      } else {
        res.json({ alreadyexisting: true });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postLogin = async (req, res) => {
 
  const email = req.body.email;
  const password = req.body.password;
 
  try {
    const user = await User.findAll({ where : { email : email}});
   // console.log('email -->', user.length)
    if(user.length !== 0){
      const res2 = await User.findAll({where : { password : password}})
     // console.log('password-->', res2)
      bcrpt.compare(password, user[0].password, async function (err, result) {
        if(err){
          console.log(err);
        }
        if(result === true){
          res.json({ success : true, token : generateAcceessToken(user[0].id, user[0].name)})
        }else{
          res.json({password: "incorret"})
        }

      })
    }
    else{
      res.status(404).json({ error: "No User Exist", success: false }); 
    }
    
  } catch (err) {
    console.log(err)
  }

};
