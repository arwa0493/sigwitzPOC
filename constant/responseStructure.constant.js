/**
 * @description - This file contains the different types of responses used in the application
 * */

const ac = require('./app.constant');

/**
 * @name getResponseStructure
 * @description - Basic response structure
 * @param {Number} status
 * @param {string} message
 * @param {any?} data
 * */
exports.getResponseStructure = (status, message, data) => {
    return {
        status,
        message,
        response: data || {}
    };
};

exports.getParameterMissingResponse = missingParams => {
    const missingParamsString = missingParams.join(',');
    return this.getResponseStructure(ac.status.badRequest, `${ac.message.parameterMissing} ${missingParamsString}`);
};
exports.getServerErrorResponse = err => {
    return this.getResponseStructure(ac.status.internalServerError, `${ac.message.internalServerError} ( ${err} )`);
};


exports.getSuccessResponse = (message, data) => {
    if (message !== null && message !== undefined && data === undefined) {
        data = message;
        message = null;
    }
    return this.getResponseStructure(ac.status.success, message || ac.message.success, data);
};


exports.getDataNotFoundResponse = () => {
    return this.getResponseStructure(ac.status.successNoRecords, ac.message.noDataFound);
};
