const { Router, json } = require('express');
const User = require('../schemas/mongo/userSchema');
const mongoose = require('mongoose');

const router = Router();
router.use(json());

router.post('/user/todoList/update', async (req,res) => {
    try{
        const user = await User.findById(req.headers.cookie.replace('id=',''));
        if(!user){
            throw new Error("Invalid user input");
        }
        const id = req.headers.cookie.replace('id=','');
        await User.updateOne({'_id': id}, {todoList: req.body})
        res.status(200).send("Success");
    }catch(e){
        res.status(500).send(e.toString());
    }
})

router.get('/user/todoList', async (req, res) => {
    try{
        const id = req.headers.cookie.replace('id=','');
        const result = await User.findOne({_id: id});
        res.status(200).send(result);
    }catch(e){
        res.status(500).send(e.toString());
    }
})

router.post('/user/todoList/updateOne', async (req, res) => {
    try{
        const id = req.headers.cookie.replace('id=','');
        await User.updateOne({'_id': id}, {todoList: req.body})
    }catch(e){
        res.status(500).send(e.toString());
    }
})

module.exports = router;

