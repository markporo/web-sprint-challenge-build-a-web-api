// add middlewares here related to actions
const actionsModel = require("./actions-model")
module.exports = { logger, validateId, validateAction }


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
    // DO YOUR MAGIC
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: "missing a required field" })
    } else {
        next();
    }
}