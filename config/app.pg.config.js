require('dotenv').config();
const {Pool} = require('pg');
/*const conn = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});*/
const conn = require('knex')({
    client: 'pg',

    connection: {
        /*	user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOST,*/
        connectionString: process.env.DATABASE_URL,

    },
	ssl: {
		rejectUnauthorized: false
	},
    pool: {min: 0, max: 7},
    log: {
        warn(message) {
            console.log(message);
        },
        error(message) {
            console.log(message);
        }
    }
});

module.exports = {
    conn
};
