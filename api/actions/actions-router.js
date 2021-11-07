// Write your "actions" router here!
//const { Router } = require('express');
//const { localLogger } = require('../middleware/middleware');
//const usersArray = require("./usersArray");


// Create Router by invoking router method
const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json("actions");
})

module.exports = router;