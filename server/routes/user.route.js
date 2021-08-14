const { Router, json } = require('express');
const userModel = require('../models/User.model');

const router = Router();
router.use(json());

router.post('/user/todoList/update', async (req,res) => {
    try{
        const user = await userModel.findById(req.headers.cookie.replace('id=',''));
        if(!user){
            throw new Error("Invalid user input");
        }
        const id = req.headers.cookie.replace('id=','');
        await userModel.updateOne({'_id': id}, {todoList: req.body})
        res.status(200).send("Success");
    }catch(e){
        res.status(500).send(e.toString());
    }
})

router.get('/user/todoList', async (req, res) => {
    try{
        const id = req.headers.cookie.replace('id=','');
        const result = await userModel.findOne({_id: id});
        res.status(200).send(result);
    }catch(e){
        res.status(500).send(e.toString());
    }
})

router.post('/user/todoList/updateOne', async (req, res) => {
    try{
        const id = req.headers.cookie.replace('id=','');
        await userModel.updateOne({'_id': id}, {todoList: req.body})
    }catch(e){
        res.status(500).send(e.toString());
    }
})

router.post('/user/groups/add', async (req, res) => {
    try{
        const id = req.headers.cookie.replace('id=','');
        await userModel.updateOne({'_id':id}, {groups: req.body})
    }catch(e){
        res.status(500).send(e.toString());
    }
})

router.get('/user/groups', async (req, res) => {
    const id = req.headers.cookie.replace('id=','');
    const result = await userModel.findOne({_id: id});
    res.status(200).send(result.groups)
})

module.exports = router;

