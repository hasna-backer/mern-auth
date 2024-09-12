import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateTokens.js"

/* 
desc    Auth user and set Token
route   POST api/users/auth
access public
*/
const authUser = asyncHandler(async (req, res) => {
    console.log("loginnnnn");

    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        console.log("Authentication failed");

        res.status(400);
        throw new Error('Invalid email or password')
    }
})

/* 
desc    Auth user and set Token
route   POST api/users/auth
access public
*/
const googleAuth = asyncHandler(async (req, res) => {
    console.log("loginnnnn");

    const { email } = req.body
    const user = await User.findOne({ email })
    try {
        if (user) {
            generateToken(res, user._id)
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email
            })
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            // const username = req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8)

            console.log('generatedPassword,username', generatedPassword, username);
            console.log(req.body);

            const user = await User.create({ name: req.body.name, email, password: generatedPassword, profilePicture: req.body.photo })
            console.log('user', user);

            if (user) {
                generateToken(res, user._id)
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email
                })

            }
        }
    } catch (error) {
        res.status(400);
        throw new Error('Invalid email or password')
    }
})




/* 
desc    Register a new user 
route   POST api/users
access public
*/
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    console.log("req.body : ", req.body);
    const userExists = await User.findOne({ email })
    console.log('user exist:', userExists);

    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }
    const user = await User.create({ name, email, password })
    console.log('user', user);

    if (user) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }

    // res.status(200).json({ message: 'Register  user' })
})

/* 
desc    Logout user
route   POST api/users/logout
access public
*/
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: 'User Logged out' })
})

/* 
desc    Get user profile
route   GET api/users/profile
access private
*/
const getUserProfile = asyncHandler(async (req, res) => {
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
    res.status(200).json({ message: 'user profile ' })
})

/* 
desc    update user profile
route   PUT api/users/ptofile
access private
*/
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    console.log("user:", user);
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })
    } else {
        res.status(404);
        throw new Error('user not found')
    }


})




export {
    authUser,
    googleAuth,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile

}