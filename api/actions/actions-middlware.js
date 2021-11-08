// add middlewares here related to actions
const actionsModel = require("./actions-model")
const projectsModel = require('../projects/projects-model')
module.exports = { logger, validateId, validateAction, validateProjectID }


function logger(req, res, next) {
    const timeRightNow = new Date()

    console.log("Request Method: ", req.method)
    console.log("Request URL: ", req.originalUrl)
    console.log("Time and Date: ", timeRightNow.toGMTString())
    next();
}

function validateId(req, res, next) {
    actionsModel
        .get(req.params.id)
        .then((action) => {
            if (action) {
                req.user = action;
                next();
            } else {
                res.status(404).json({ message: "user not found" });
            }
        })
        .catch(() => {
            res.status(500).json({ message: "error" });
        })
}

function validateAction(req, res, next) {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: "missing a required field" })
    } else {
        next();
    }
}

async function validateProjectID(req, res, next) {
    const Projects = await projectsModel.getProjectActions(req.body.project_id);
    //const found = Projects.some(p => { p.project_id === req.body.project_id })
    //console.log("projects.some()", Projects)
    if (Projects === undefined || Projects === null || Projects === []) {
        res.status(404).json({ message: "That Project ID does not exist." })
    } else {

        next();

    }
}