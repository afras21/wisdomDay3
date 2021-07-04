
const userToken = "_wisdom123";

let auth =(req,res,next)=>{
    let token =req.headers.token;
    if(token === userToken) {
        req.token = token;
        next();
    } else {
        return res.status(401).json({
            Success: false,
            message: "Invalid Token"
        })
    }
}

module.exports={auth};