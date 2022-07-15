const PATH = require("path");
const CONFIG = require(PATH.join(__dirname, "..", "config.js"));

const sql = require("mssql");

const CONFIGDB = {
  user: CONFIG.DATABASE.USER,
  password: CONFIG.DATABASE.PASSWORD,
  server: CONFIG.DATABASE.SERVER,
  database: CONFIG.DATABASE.NAME,
  stream: CONFIG.DATABASE.STREAM,
  requestTimeout: CONFIG.DATABASE.REQUESTTIMEOUT, // 30000, //ms 30sec
  options: {
    encrypt: CONFIG.DATABASE.ENCRYPT,
  },
};

const poolPromise = new sql.ConnectionPool(CONFIGDB)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("MSSQL ERROR=>", err.message));

module.exports = {
  sql,
  poolPromise,
};
