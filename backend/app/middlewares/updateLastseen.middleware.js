const jwt = require('jsonwebtoken');
const allModel = require('../models/relationships');
const authconfig = require('../config/auth.config');

const updateLastseen = async(req, res, next)=>{
    console.log("hello in middle")
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }
    const currentUserObj = jwt.decode(token, authconfig.secret);
    let thisUSer = await allModel.userModel.user.findOne(
        {
            where: {
                id: currentUserObj?.id,
            },
        }
    );
    thisUSer.last_seen = ((new Date().getFullYear())+'-'+((new Date().getMonth()+1) > 9 ? (new Date().getMonth()+1) : '0'+(new Date().getMonth()+1))+'-'+(new Date().getDate())) + ' '+((new Date().getHours())+':'+(((new Date().getMinutes()) > 9 ? new Date().getMinutes(): '0'+(new Date().getMinutes())))+':'+((new Date().getSeconds() > 9 ? new Date().getSeconds() : "0"+new Date().getSeconds())));
    await thisUSer.save();
    next();
}

module.exports = {updateLastseen};