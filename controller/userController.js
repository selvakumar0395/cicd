const User = require('../models/users');
const asyncHandler = require('express-async-handler');


const getAllUser = asyncHandler(async (req, res) => {
    try {
        const allusers = await User.find();
        res.json(allusers);
    } catch (error) {
        throw new Error(error);
    }
});

const getUserById = asyncHandler(async (req,res) => {
    const {id} = req.params;
    try {
        const userById = await User.findById(id);
        res.json(userById);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteUserById = asyncHandler(async (req,res) => {
    const {id} = req.params;
    try {
        const deleteById = await User.findByIdAndDelete(id);
        res.json(deleteById);
    } catch (error) {
        throw new Error(error);
    }
});

const updateUserById = asyncHandler( async (req, res) => {
    const {id} = req.params;
    try {
        const isValidId = await User.findById(id);
        if(isValidId){
            const updateById = await User.findByIdAndUpdate(
                id,
                {
                    firstname: req?.body?.firstname,
                    lastname:req?.body?.lastname,
                    email: req?.body?.email,
                    password: req?.body?.password,
                    mobile: req?.body?.mobile
                },
                {
                    new: true,
                }
            );
            res.json(updateById);

        }else{
            throw new Error('there is no record with this id');
        }
        
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {getAllUser, getUserById, deleteUserById, updateUserById};