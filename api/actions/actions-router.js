// Write your "actions" router here!
//const { Router } = require('express');
const { validateId, validateAction, validateProjectID } = require('./actions-middlware');
const actionsModel = require("./actions-model")

// Create Router by invoking router method
const router = require('express').Router();

router.get('/', (req, res) => {
    actionsModel
        .get()
        .then((actions) => {
            return res.status(200).json(actions)

        })
        .catch(() => {
            res.status(500).json({ message: "server error" })
        })
})

router.get('/:id', validateId, async (req, res) => {
    try {
        const foundAction = await actionsModel.get(req.params.id)
        res.status(200).json(foundAction)
    } catch {
        res.status(500).json({ message: "The action could not be retrieved" })
    }
});

router.delete('/:id', validateId, async (req, res) => {
    try {
        const actioToBeRemoved = await actionsModel.remove(req.params.id)
        res.status(200).json(actioToBeRemoved)
    } catch {
        res.status(500).json({ message: "The action could not be removed" })
    }
});

// couldn't get validateProjectId to work right
router.post('/', validateAction, validateProjectID, async (req, res) => {
    actionsModel
        .insert(req.body)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error while saving the action to the database" })
        })
});


router.put('/:id', validateId, validateAction, (req, res) => {
    console.log("update", req.body)
    actionsModel
        .update(req.params.id, req.body)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error updating this action" })
        })
})

module.exports = router;

