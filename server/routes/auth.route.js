const { Router, json } = require('express');
const UserModel = require('../models/User.model');
const userModel = require('../models/User.model');

const router = Router();
router.use(json());

router.post('/auth/register', async (req, res) => {
    try{
    const new_User = new userModel({
    todoList: []
    });
    const result = await new_User.save();
    res.status(200).send(result.id);
}catch(e){
    res.status(500).send(e.toString());
}
})

router.post('/auth/login', async (req, res) => {
    try{
        user = await UserModel.findOne({username: req.body.username}).exec();
        res.status(200).send(user);
    }catch(e){
        res.status(500).send(e.toString());
    }
})

module.exports = router;