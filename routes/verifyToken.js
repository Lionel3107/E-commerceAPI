const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET, (err, user)=>{
            if(err) res.status(403).json("Token not valid");
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You are not authenticated");
    }
};

const verifyTokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            res.status(403).json("Action not authorized");
        }
    });
};
const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin){
            next();
        } else {
            res.status(403).json("Action not authorized");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAuthorization,
    verifyTokenAdmin
}







module.exports = { verifyToken };