const {config} = require('dotenv')
config()

module.exports = {
  PORT: process.env.PORT || 8000,
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE
  },
};