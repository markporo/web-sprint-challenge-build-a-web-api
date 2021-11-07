// Write your "actions" router here!
//const { Router } = require('express');
const { validateId } = require('./actions-middlware');
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

module.exports = router;


// Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_:

// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
// - [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.