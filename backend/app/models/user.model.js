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
    last_seen:DataTypes.TEXT,
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequilize.literal('CURRENT_TIMESTAMP'),
      },
},{
    tableName:'user',
    timestamps: false,
});

module.exports = {user,status};