const {ac, rs} = require('../constant');
const {SalesService} = require('../dbService');
const {RequestUtil, DateUtil} = require('../util');

/**
 * @function
 * @name sales.controller.js => add
 * @description - used to add sales
 * <br>
 */
exports.add = async (req, res) => {
    try {
        const jsonData = req.body;
        const missingParams = RequestUtil.isAllParametersPresent([jsonData, 'amount']);
        if (missingParams.length > 0)
            return res.status(ac.status.success).send(rs.getParameterMissingResponse(missingParams));

        jsonData.date = DateUtil.getDateInUTCFormat();

        const doc = await SalesService.add(jsonData);
        return res.status(ac.status.success).send(rs.getSuccessResponse(doc.rowCount));
    } catch (err) {
        return res.status(ac.status.success).send(rs.getServerErrorResponse(err));
    }
};

/**
 * @function
 * @name sales.controller.js => get
 *
 * @description - fetches the list of sales sum amount
 * if passed daily then sum amount of
 * Daily stats ,I/P - If requested daily ,O/P - stats(sum of amount) on the basis of each hour of the day
 * Weekly stats ,I/P - If requested weekly  ,O/P - stats(sum of amount) on the basis of each day of the week
 * Monthly stats ,I/P - If requested weekly  ,O/P - stats(sum of amount) on the basis of each day of the month
 * <br>
 */
exports.getStats = async (req, res) => {
    try {
        const {key} = req.query;
        const missingParams = RequestUtil.isAllParametersPresent([{key}, 'key']);
        if (missingParams.length > 0)
            return res.status(ac.status.success).send(rs.getParameterMissingResponse(missingParams));

        let condition;
        if (key === 'daily') {
            condition = 'date > current_date - interval \'24\' hour';
        } else if (key === 'weekly') {
            condition = 'date > current_date - interval \'7\' day';
        } else if (key === 'monthly') {
            condition = 'date > current_date - interval \'30\' day';
        }
        if (condition === undefined) {
            return res.status(ac.status.success).send(rs.getServerErrorResponse(ac.message.keyMissingValueError));
        } else {
            const docs = await SalesService.get(condition);
            return res.status(ac.status.success).send(rs.getSuccessResponse(docs[0]));
        }
    } catch (err) {
        return res.status(ac.status.success).send(rs.getServerErrorResponse(err));
    }
};
