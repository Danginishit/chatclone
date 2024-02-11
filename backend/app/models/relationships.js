const userModel = require('./user.model');
const chatModel = require('./chat.model');

chatModel.chat.hasOne(userModel.user,{ foreignKey: 'id', sourceKey: 'from_user',as: 'fromUser'});
chatModel.chat.hasOne(userModel.user,{ foreignKey: 'id', sourceKey: 'to_user',as: 'toUser' });


module.exports = {userModel,chatModel};