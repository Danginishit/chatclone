var express = require('express');
const sequlize = require('../config/db.connection');
const { Op } = require('sequelize');
const jwt = require('../middlewares/authJwt');
const usercontroller = require('../controllers/user.controller');
const chatcontroller = require('../controllers/chat.controller');
const { body, validationResult } = require('express-validator');
const CheckexistingUser = require('../middlewares/verifySignUp');

const allModels = require('../models/relationships');

var router = express.Router();

router.get('/list/:toUser_id', [jwt.verifyToken], async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    let toUser_id = req.params.toUser_id;
    let result = await chatcontroller.GetListForChat(toUser_id,token);
    return res.status(result.status).json(result.data);
});


router.post('/store', [
    jwt.verifyToken,
    body('from_user','From User is required').notEmpty(),
    body('to_user','to user is required').notEmpty(),
    body('message','message is required').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { from_user, to_user, message } = req.body;
    let result = await chatcontroller.MessageStore(from_user, to_user, message)
    console.log(result.success);
    if (result.success) {
        return res.status(result.status).json({
            status: true,
            message: result.message,
        });
    }
});

module.exports = router;