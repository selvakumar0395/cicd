const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/users');

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{ expiresIn: '1h' });
}

const authMiddleware = asyncHandler(async (req,res,next) => {
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        try {
            if(token){
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                const userDetails = await User.findById(decode?.id);
                req.user = userDetails;
                next();
            }
        } catch (error) {
            throw new Error('Not Authorized token expired.Please login again');
        }
        
    }else{
        throw new Error('there is no token - invaild user');
    }
});

module.exports = {generateToken, authMiddleware}