const { Router, json } = require('express');
const userModel = require('../schemas/mongo/userSchema');
const mongoose = require('mongoose');

const router = Router();
router.use(json());

router.post('/auth/register', async (req, res) => {
    const new_User = new userModel({
        todoList: []
    })
    const result = await new_User.save();
    res.status(200).send(result.id)
})

module.exports = router;