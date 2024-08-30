const { generateToken } = require('../middleware/authentication');
const User = require('../models/users');
const asyncHandler = require('express-async-handler');

const userRegister = asyncHandler(async (req,res) => {
        const email = req.body.email;
        const findUser = await User.findOne({email:email});
        if(!findUser){
            const newUser = await User.create(req.body);
            res.json(newUser);
        }else{
            throw new Error('User already exits');
        }
    }
);

const userLogin = asyncHandler(async (req,res) => {
    const { email, password} = req.body;
    const finduser = await User.findOne({email: email});
    if(finduser &&  await finduser.comparePassword(password)){
        res.json({
            id:finduser?._id,
            firstname: finduser?.firstname,
            lastname:finduser?.lastname,
            email: finduser?.email,
            password: finduser?.password,
            mobile: finduser?.mobile,
            token: generateToken(finduser?._id)
        });
    }else{
        throw new Error('Invalid Credentials');
    }
});

module.exports = {userRegister, userLogin }