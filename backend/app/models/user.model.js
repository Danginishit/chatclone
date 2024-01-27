const Sequilize = require('../config/db.connection');

const {DataTypes} =require('sequelize')

const status = {
    Active:0,
    Inactive:1,
}

const user = Sequilize.define('user',{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true
    },
    username:DataTypes.STRING,
    password:DataTypes.STRING,
    email:DataTypes.STRING,
    status:DataTypes.INTEGER,
},{
    tableName:'user',
    timestamps: false,
});

module.exports = {user,status};