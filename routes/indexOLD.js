var express = require("express");
var router = express.Router();
const { sql, poolPromise } = require("./db");
const { Logout, postLogin, checkLogin } = require("./auth");
const { authenticateJWT } = require("./token");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

router.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
router.use(bodyParser.json()); // for parsing application/json
router.use(cookieParser())


router.use(function (req, res, next) {
  // Website you wish to allow to connect
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3009'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// login

// router.use(require("./apiTranscript"))
// router.use(require("./apiTranscriptQR"))

router.post("/logout", async (req, res, next) => await Logout(req, res, next))
router.post("/login", async (req, res, next) => await postLogin(req, res, next))
router.post("/check", async (req, res, next) => await checkLogin(req, res, next))

// const { studentServices } = require('../routes/student_service/index')

// router.use("/student", studentServices);

router.use(require("./apiRoutes"))
// router.use( authenticateJWT, require("./apiRoutes")) 

module.exports = router;
