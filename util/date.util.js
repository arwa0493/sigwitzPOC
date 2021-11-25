const moment = require('moment');


exports.getDateInUTCFormat = () => {
    return new Date().toUTCString();
};

exports.getDateInISOFormat = () => {
    return new Date().toISOString();
};

exports.getDateFromUTCString = dateString => {
    return new Date(dateString);
};

exports.getDateInDifferentFormats = (formatId, dateString) => {
    const d = moment(new Date(dateString));
    switch (formatId) {
        case 1: {
            return d.format('DD/MM/YYYY');
        }
        case 2: {
            return d.format('ddd, MMMM Do YYYY');
        }
        default: {
            return d.format('DD/MM/YYYY');
        }
    }
};
