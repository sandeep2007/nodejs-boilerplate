const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: (process.env.DATABASE_PASSWORD !== 'null' && process.env.DATABASE_PASSWORD !== '' ? process.env.DATABASE_PASSWORD : ''),
    database: process.env.DATABASE_NAME,
    charset: process.env.DATABASE_CHARSET,
    Promise: bluebird
};

class Database {
    constructor(external_config) {
        if (external_config) {
            config = external_config
        }
        (async () => {
            this.connection = await mysql.createConnection(config);
        })();
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = Database