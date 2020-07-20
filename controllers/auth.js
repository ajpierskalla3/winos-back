const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/errorHandlers');


signup = (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.error
        }
        user.salt = undefined;
        user.hash_password = undefined;
        res.json({
            user
        })
    })
}


signin = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.error
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Contents do not match"
            })
        }

        const token = jwt.sign({ _id: user }, process.env.JWT_SECRET)//remember this
        res.cookie('token', token, { expire: new Date() + 9999 })
        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, email, name, role } })


    })
}


signout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: "You have successfully signed out." })

}

requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'

})

isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user) {
        return res.status(403).json({
            error: "access denied"
        })
    }
}


// isAdmin = (req, res, next) => {
//     if (req.profile.role === 0) {
//         return res.status(403).json({
//             error: "You do not have access to this"
//         })
//     }
//     next()
// }


module.exports = {
    signup,
    signin,
    signout,
    requireSignin,
    isAuth,

}