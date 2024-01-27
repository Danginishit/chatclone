var express = require('express');
const sequlize = require('../config/db.connection');
const { Op } = require('sequelize');
const jwt = require('../middlewares/authJwt');

const allModels = require('../models/relationships');

var router = express.Router();

router.get('/list',jwt.verifyToken,async(req,res)=>{
    await sequlize.authenticate();
    console.log("connection established successfully");
    await allModels.userModel.user.findAll().then((result)=>{
        res.json(result);
    });
});

module.exports = router;