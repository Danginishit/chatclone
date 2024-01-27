const jwt = require("jsonwebtoken");
const config = require('../config/auth.config');
const AllModels = require('../models/relationships');

const user = AllModels.userModel.user;

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send({
            message: "Unauthorized!",
        });
    }
    
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }
    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
}

module.exports = {verifyToken};

