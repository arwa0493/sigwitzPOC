const {conn} = require('../config/app.pg.config');

exports.add = data => {
    return conn('sales').insert(data);
};

exports.get = (conditions) => {
    /*SELECT * FROM sales WHERE date > current_date - interval '24' hour;*/
    /*`date > current_date - interval '24' hour`*/
    return conn
        .select(conn.raw(`SUM(amount) as total_amount`))
        .from(`sales`)
        .where(conn.raw(conditions))
};


