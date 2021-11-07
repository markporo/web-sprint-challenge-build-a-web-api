// add middlewares here related to actions
const actionsModel = require("./actions-model")
module.exports = { logger, validateId }


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

