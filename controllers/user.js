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
 
    const {email,password} = req.body
    try{
        const usercheck = await User.findOne({where:{email:email}})
        if(!usercheck){
            return res.status(404).json({success:false,message:'user not found'})
        }
        const userPwCheck = await bcrpt.compare(password,usercheck.password)
        if(!userPwCheck){
            return res.status(401).json({success:false,message:'wrong password'})
        }

        res.set("authToken", generateAcceessToken(usercheck.id));
        return res.status(200).json({success:true,message:'user logged in successful',data:usercheck, token:generateAcceessToken(usercheck.id)})
    
  } catch (err) {
    console.log(err)
  }

};


exports.getAlluser = async (req, res) => {
  try {
    let users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};