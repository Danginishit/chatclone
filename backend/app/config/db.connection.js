const Sequilize = require('sequelize');

const db_conf = require('./db.config');

const sequelize = new Sequilize(db_conf.DB,db_conf.USER,db_conf.PASSWORD,{
    host:db_conf.HOST,
    dialect:db_conf.dialect,
});

module.exports = sequelize