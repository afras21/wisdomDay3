/**
 * Authentication middleware
 */

 const secretKey = '_wisdom123';

 const auth = (req, res, next) => {
     const { token } = req.headers; // destructuring

    console.log('User Key -', req.headers.token)

    if(secretKey == token) {
        next();     // continue statement..
    } else {
        return res.status(401).json({
            success: false,
            message: 'You dont have access'
        });
    }
 }


module.exports = { auth };