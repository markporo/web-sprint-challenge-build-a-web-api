// add middlewares here related to projects
module.exports = { validateProject, validateProjectId }
const projectsModel = require('./projects-model')

async function validateProjectId(req, res, next) {
    const found = await projectsModel.get(req.params.id)
    if (found === null || found === undefined) {
        res.status(404).json({ message: "There is no project with that id" })
    } else {
        next()
    }

}

function validateProject(req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: "missing required text field" })
    } else {
        next();
    }

}