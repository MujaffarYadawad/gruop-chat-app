const User = require("../models/user");
const bcrpt = require("bcrypt");
const saltRounds = 10;
 

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
