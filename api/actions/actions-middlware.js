// add middlewares here related to actions
module.exports = { logger }


function logger(req, res, next) {
    const timeRightNow = new Date()

    console.log("Request Method: ", req.method)
    console.log("Request URL: ", req.originalUrl)
    console.log("Time and Date: ", timeRightNow.toGMTString())
    next();
}

