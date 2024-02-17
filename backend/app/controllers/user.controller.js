const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const allModel = require('../models/relationships');
const authconfig = require('../config/auth.config')



const UserSingup = async (username, email, password) => {
    try {
        const user = await allModel.userModel.user.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 8),
            status: 1,
        });
        if (user) {
            return { success: true, message: 'User registered successfully!' };
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

const UserSignIn = async (email, password) => {
    try {
        let user = await allModel.userModel.user.findOne({
            where: {
                email: email,
            },
        });
        user.last_seen = 'Online';
        await user.save();

        if (!user) {
            return { success: false, message: "User Not found", status: 404 }
        }

        const passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        );
        if (!passwordIsValid) {
            return { status: 401, success: false, message: "Invalid Password" }
        }
        const token = jwt.sign({ id: user.id },
            authconfig.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400,
        });
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            token: token,
            status: 200,
            message: "successfully login!"
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

const listusers = async () => {
    try{
        console.log("hello in controller")
        let result = await allModel.userModel.user.findAll({
            attributes: ['id', 'username','email','status','last_seen','created_at','updated_at']
        });
        return result;
    }catch(err){
        throw new Error(err.message);
    }
}

const currentuserdata = async (jwtverifytoken = false) => {
    if(!jwtverifytoken){
        return {status:401,data:{
            message:"not loggdin user",
        }}
    }
    return {status:200,data:jwt.decode(jwtverifytoken, authconfig.secret)}
}

module.exports = { UserSingup, UserSignIn ,listusers,currentuserdata};