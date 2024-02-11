const Sequilize = require('../config/db.connection');

const {DataTypes} =require('sequelize')



const chat = Sequilize.define('chat',{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true
    },
    from_user:DataTypes.BIGINT,
    to_user:DataTypes.BIGINT,
    message:DataTypes.TEXT,
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequilize.literal('CURRENT_TIMESTAMP'),
      },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequilize.literal('CURRENT_TIMESTAMP'),
      },
},{
    tableName:'message',
    timestamps: false,
});

module.exports = {chat};