const { Router, json } = require('express');
const user = require('../schemas/mongo/userSchema');
const mongoose = require('mongoose');

const router = Router();
router.use(json());

router.get('/update', async (req,res) => {
    user.updateOne({id: req.query.id}, {todoList:[...todoList,req.newToDo]})
})

module.exports = router;