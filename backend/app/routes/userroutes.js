var express = require('express');
const sequlize = require('../config/db.connection');
const { Op } = require('sequelize');
const jwt = require('../middlewares/authJwt');
const usercontroller = require('../controllers/user.controller');
const { body, validationResult } = require('express-validator');
const CheckexistingUser = require('../middlewares/verifySignUp');

const allModels = require('../models/relationships');

var router = express.Router();

router.get('/list', jwt.verifyToken, async (req, res) => {

    let result = await usercontroller.listusers();
    return res.json(result);
});

router.get('/current', [jwt.verifyToken], async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    let result = await usercontroller.currentuserdata(token);
    return res.status(result.status).json(result.data);
});

router.post('/signup', [
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    CheckexistingUser.checkDuplicateUsernameOrEmail
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    let result = await usercontroller.UserSingup(username, email, password)
    if (result.success) {
        res.json({
            status: true,
            message: "register successfully",
        });
    }
});

router.post('/signin', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    let response = await usercontroller.UserSignIn(email, password);
    res.status(response.status).json(response);
});


module.exports = router;