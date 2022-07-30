const reportService = require("../../services/student/reportService")
const router = require("express").Router()

router.get("/reportslist", async function (req, res, next) {
    try {
        const result = await reportService.reportTypelist();
        res.send(result);
    } catch (err) {
      console.log("ReportsList error", err.message);
      res.send({ ReportsList: [] });
    }
  
  });
router.get("/reportApplicationWait", async function (req, res, next) {
    try {
        const { reportType } = req.query
        const result = await reportService.reportApplicationWait(reportType);
        res.send( result );
    } catch (err) {
      console.log("reportApplicationWait error", err.message);
      res.send({ reportApplicationWait: [] });
    }
  
  });
router.post("/reportApplicationDone", async function (req, res, next) {
    try {
        const { s_fio_document } = req.body
        const result = await reportService.reportApplicationDone(s_fio_document);
        res.send({ ReportsList: result });
    } catch (err) {
      console.log("reportApplicationDone error", err.message);
      res.send({ reportApplicationDone: [] });
    }
  
  });
router.post("/reportApplicationView", async function (req, res, next) {
    try {
        const { id_okno_zakaz, status } = req.body
        const result = await reportService.reportApplicationView(id_okno_zakaz);
        res.send({ ReportsList: result });
    } catch (err) {
      console.log("reportApplicationUpdate error", err.message);
      res.send({ result: null });
    }
  
  });
router.post("/reportApplicationUpdate", async function (req, res, next) {
    try {
        const { id_okno_zakaz, status } = req.body
        const result = await reportService.reportApplicationUpdate(id_okno_zakaz, status);
        res.send({ ReportsList: result });
    } catch (err) {
      console.log("reportApplicationUpdate error", err.message);
      res.send({ result: null });
    }
  
  });
  
router.post("/obhodnoi-list", async function (req, res, next) {
    try {
        const { id_group, id_student, id_protocols } = req.body
        const result = await reportService.obhodnoiList(id_group, id_student, id_protocols);
        res.send({ ReportsList: result });
    } catch (err) {
      console.log("ObhodnoiList error", err.message);
      res.send({ ObhodnoiList: [] });
    }
  
  });
  
router.post("/voenkom", async function (req, res, next) {
    try {
        const { id_group, id_student, id_raion, id_faculty } = req.body
        const result = await reportService.voenkom(id_group, id_student, id_raion, id_faculty);
        res.send({ ReportsList: result });
    } catch (err) {
      console.log("VoenKom error", err.message);
      res.send({ VoenKom: [] });
    }
  
  });
  
router.post("/studing", async function (req, res, next) {
    try {
        const { id_group, id_student, id_faculty } = req.body
        const result = await reportService.studing(id_group, id_student, id_faculty);
        res.send({ ReportsList: result });
    } catch (err) {
      console.log("Studing error", err.message);
      res.send({ Studing: [] });
    }
  
  });
  
router.post("/leave", async function (req, res, next) {
    try {
      const { id_student } = req.body;
      const result = await reportService.leave(id_student);
        res.send({ ReportsList: result });
    } catch (err) {
      console.log("Leave error", err.message);
      res.send({ Leave: [] });
    }
  
  });
  
module.exports = router