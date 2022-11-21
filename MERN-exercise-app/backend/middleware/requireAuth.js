const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({error: 'authorization token required'});
    }

    const token = authorization.split(' ')[1];

    try{
        //verify if the token is the correct one
       const { _id } = jwt.verify(token, process.env.SECRET)

       //search for the current user info
       req.user = await User.findOne({_id}).select('_id');
       
       //fires the next handler function
       next()

    }catch(e){
        console.log(e)
        res.status(401).json({error: 'Request is not authorized'});
    }

}

module.exports = requireAuth;