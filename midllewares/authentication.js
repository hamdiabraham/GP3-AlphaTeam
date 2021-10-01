const User = require("../models").user;
const jwt = require("jsonwebtoken");

const authentication = async (req,res,next) => {
    try {
        const { token } = req.headers
        if(!token) {
            throw new Error('access token required!')
        }

        // verify token
        const jwtPayload = jwt.verify(token , 'secure')

        // check user
        const dataUser = await User.findByPk(jwtPayload.Id)
        if(!dataUser) {
            throw new Error('invalid access token!')
        }
        req.currentUser = dataUser
        next()
    } catch (error) {
        next(error)
    }
} 

module.exports = authentication;