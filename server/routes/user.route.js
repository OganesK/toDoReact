const { Router, json } = require('express');
const userModel = require('../models/User.model');
const auth = require('./auth')

const router = Router();

router.post('/user/todoList/update', auth.required, async (req,res) => {
    try{
        const { payload: { id } } = req;
        const user = await userModel.findById(id);
        if(!user){
            throw new Error("Invalid user input");
        }
        await userModel.updateOne({'_id': id}, {todoList: req.body})
        res.status(200).send("Success");
    }catch(e){
        res.status(500).send(e.toString());
    }
})

router.get('/user/todoList', auth.required, async (req, res) => {
    try{
        const { payload: { id } } = req;
        const result = await userModel.findOne({"_id": id});
        res.status(200).send(result);
    }catch(e){
        res.status(500).send(e.toString());
    }
})

router.post('/user/groups/add', auth.required, async (req, res) => {
    try{
        const { payload: { id } } = req;
        await userModel.updateOne({'_id':id}, {groups: req.body})
    }catch(e){
        res.status(500).send(e.toString());
    }
})

router.get('/user/groups', auth.required, async (req, res) => {
    try{
    const { payload: { id } } = req;
    const result = await userModel.findOne({token: id});
    res.status(200).send(result.groups)}catch(e){
        res.status(500).send(e);
    }
})

router.post('/user/groups/delete', auth.required, async (req, res) => {
    try{
        const { payload: { id } } = req;
        await userModel.updateOne({'_id': id}, {groups:req.body})}catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;

