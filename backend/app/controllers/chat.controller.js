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

const MessageStore = async(from_user, to_user, message)=>{
    try {
        // Assuming `chatModel` is correctly imported and initialized
        const chat = await allModel.chatModel.chat.create({
            from_user: from_user,
            to_user: to_user,
            message: message
        });

        return {
            success: true,
            status: 200,
            data: chat,
            message: "Chat message stored successfully"
        };
    } catch (error) {
        console.error('Error storing chat message:', error);

        return {
            success: false,
            status: 500,
            error: "Internal Server Error",
        };
    }
}

module.exports = {GetListForChat,MessageStore};