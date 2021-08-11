const { Router, json } = require('express');
const user = require('../schemas/mongo/userSchema');
const mongoose = require('mongoose');
const {parse, stringify} = require('flatted');

const router = Router();
// router.use(json());

router.get('/getToDo', async (req, res) => {
    const result = await user.findOne({_id: req.query.id}).exec();
    res.status(200).send(result.todoList);
})

module.exports = router;