// const model = require("../models").user;
// const jwt = require("jsonwebtoken");

// const authentication = (req,res,next) => {
//     if (req.headers.authorization) {
//         const token = req.headers.authorization.match(/[\w\.]+$/)[0];
//         const payload = jwt.verify(token, "secure", (err,token) => {
//             if (err) {
//                 statusError.message = err.message;
//                 statusError.code = 400;
//                 next(statusError);
//             }
//             return token;
//         });
//         model.query(
//             "SELECT * FROM Users WHERE "
//         )
//     }
// }


const model = require("../models").user;
const jwt = require("jsonwebtoken");

const authentication = async (req,res,next) => {
    try {
        const { token } = req.headers
        if(!token) {
            throw new Error('access token required!')
        }

        // verify token
        const jwtPayload = jwt.verify(token , 'login')

        // check user
        const dataUser = await User.findByPk(jwtPayload.userId , { include: Role })
        if(!dataUser) {
            throw new Error('invalid access token!')
        }
        req.currentUser = dataUser
        next()
    } catch (error) {
        next(error)
    }
} 

module.exports = authentication