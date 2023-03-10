const User = require('../models/user');
const Message = require('../models/message');

exports.postMessage = async(req, res, next) =>{
  const msg = req.body.msg;
  //const user = req.body.userId
 console.log('msg-->', msg)

  try {
    console.log('message--')
        const response = await req.user.createMessage({ message:msg, userId: req.user.id  });
         res.status(201).json({ message: response });
    
  } catch (err) {
    console.log(err)
  }
}

exports.getMessage = async (req, res, next) => {
  try {
    console.log('get m')

     const message = await Message.findAll();
     //console.log('message-->',message);
     res.json(message)
  } catch (err) {
    console.log(err)
    
  }
 
}


