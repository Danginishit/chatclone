const allModel = require('../models/relationships');
const sequelize = require('../config/db.connection');
const authconfig = require('../config/auth.config');
const jwt = require('jsonwebtoken');


const GetListForChat = async (toUser_id,token)=>{
    if(!token){
        return {status:401,data:{
            message:"not loggdin user",
        }}
    }
    const currentUserObj = jwt.decode(token, authconfig.secret);
    console.log(currentUserObj?.id)
    const messages = await allModel.chatModel.chat.findAll({
        include:[
            { 
                model: allModel.userModel.user,
                as: 'fromUser',
                attributes: ['id', 'username']
            },
            { 
                model: allModel.userModel.user, 
                as: 'toUser',
                attributes: ['id', 'username']
            }
        ],
        where:sequelize.or(
            sequelize.and(
                {from_user:toUser_id},
                {to_user:currentUserObj?.id}
            ),
            sequelize.and(
                {from_user:currentUserObj?.id},
                {to_user:toUser_id}
            )
        )
    });
    return {
        status:200,
        data:messages,
    }
}

module.exports = {GetListForChat};