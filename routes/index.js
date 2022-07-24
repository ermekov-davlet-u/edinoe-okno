var express = require("express");
var router = express.Router();

const authController = require("../controller/authController")
const selectController = require("../controller/selectController")
const oknoController = require("../controller/oknoController")
const personalController = require("../controller/personalController")
const academController = require("../controller/academController")
const discriptionController = require("../controller/descriptionController")
const studentController = require("../controller/studentController")
const srudentReportController = require("../controller/report/studentReportController")
const { authenticateJWT } = require("../services/tokenService");



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


// router.use(require("./apiTranscript"))
// router.use(require("./apiTranscriptQR"))
router.get('/academ', academController.academ)

router.post("/auth/check", authController.checkLogin)
router.post("/auth/login", authController.postLogin)
router.post("/auth/logout", authController.logout)


// v-okno-sg
router.post("/select/eduform", selectController.eduform)
router.post("/select/kafedra/list", selectController.eduFaculty)
router.post("/select/f_educ/list", selectController.eduform)
router.post("/select/rate/list", selectController.eduRate)
router.post("/select/group/list", selectController.eduGroup)


//oknoController
router.post("/okno/properties", oknoController.getOknoProperties )
router.get("/access/properties", oknoController.getAccessProperties )
router.post("/propertiesiu", oknoController.getPropertiesIU )
router.get("/okno/role", oknoController.getOknoRole )

//personalController
router.post("/okno/image", personalController.getBase64Data )
router.get("/okno/obj", personalController.getOBJ )

router.post("/description-insert", discriptionController.insDiscription )
router.delete("/description", discriptionController.delDiscription )
router.put("/description", discriptionController.updDiscription )
router.post("/okno-description", discriptionController.oknoDiscription )

router.post("/student-by-group", studentController.getStudentByGroup )
router.post("/student-by-name", studentController.getStudentByName )

router.get("/payment", oknoController.getPaymentStudent)

router.use("/teacher", require('../controller/teacher/teacherController'))
router.use("/report", srudentReportController)
router.use("/regis", require("../controller/registration/academDocs"))
router.use("/local", require("../controller/localy/localyController"))

// const { studentServices } = require('../routes/student_service/index')

// router.use("/student", studentServices);

// router.use(require("./apiRoutes"))
// router.use( authenticateJWT, require("./apiRoutes")) 

module.exports = router;
