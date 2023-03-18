const User = require('../models/user');
const Message = require('../models/message');
const {Op} = require('sequelize')

exports.postMessage = async(req, res, next) =>{
  const msg = req.body.msg;
  //const user = req.body.userId
 console.log('msg-->', msg)
 

  try {
    console.log('message--')
    console.log('user details--',req.user)
        const response = await req.user.createMessage({ message:msg, name:req.user.name, userId: req.user.id  });
        console.log(response)
         res.status(201).json({ message: response });
    
  } catch (err) {
    console.log(err)
  }
}

exports.getMessage = async (req, res, next) => {
  try {
    
    const lastMsgId = req.query.id || 0;
    console.log('lstmsgid -->',lastMsgId)
     const message = await Message.findAll( {
      includes :{ 
        model : User,
        as : 'user',
        attributes: ['name']
      },
      where :{ id: { [Op.gt] : lastMsgId}  }
      }
    );
   //  console.log('message-->',message);
    
     res.json(message)
  } catch (err) {
    console.log(err)
    
  }
 
}


