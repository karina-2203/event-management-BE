const userService = require('../services/userService')

const createUser = async(req,res) => {
    try{
        const user = await userService.createUser(req.body);
        return res.status(user.statusCode).json(user);
    }catch(e){
        return res.status(e.statusCode).json(e);
    }
};

module.exports = {
    createUser
}