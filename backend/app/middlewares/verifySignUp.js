const allModel = require('../models/relationships');
const { Op } = require('sequelize');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        let user = await allModel.userModel.user.findOne({
            where: {
                [Op.or]: [
                    { username: req.body.username },
                    { email: req.body.email }
                ]
            }
        });
        if (user) {
            return res.status(400).send({
                message: "Failed! Username is already in use!"
            });
        }
        next();
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

module.exports= {checkDuplicateUsernameOrEmail}