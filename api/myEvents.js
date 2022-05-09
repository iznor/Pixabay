const logger = require("./logger");

//save logs using pre-defined events
module.exports = {
    successGET() {
        logger.log('info', "Success! GET");
    },
    failGET() {
        logger.log('error', "Fail! GET");
    }
}