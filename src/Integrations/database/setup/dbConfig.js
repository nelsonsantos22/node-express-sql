const env = process.env;
const serviceSettings = require('../../../../settings/serviceSettings.json')

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || serviceSettings.database.host/*'freedb.tech'*/,
    user: env.DB_USER || serviceSettings.database.user/*'freedbtech_geshan-lr'*/,
    password: env.DB_PASSWORD || serviceSettings.database.password/*'G2VjjQ5d47zyjqX'*/,
    database: env.DB_NAME || serviceSettings.database.database/*'freedbtech_language'*/,
    port: serviceSettings.database.port
  },
  listPerPage: env.LIST_PER_PAGE || serviceSettings.database.listPerPage,
};


module.exports = config;