const academDocsService = require("../../services/registration/academDocsService")
const router = require("express").Router()

router.post("/searchStudentList", async function (req, res, next) {
    try {
      const { s_fio_document } = req.body;
      const result = await academDocsService.searchStudentList(s_fio_document);
      res.send(result)
    } catch (err) {
      console.log("DocumentRegStudentList error", err.message);
      res.send({ DocumentRegStudentList: [] });
    }
  
  });
  
router.get("/academDocList", async function (req, res, next) {
    try {
      const result = await academDocsService.academDocList();
      res.send(result)
    } catch (err) {
      console.log("AcademDocList error", err.message);
      res.send({ AcademDocList: [] });
    }
  
  });

router.post("/academDocRegTable", async function (req, res, next) {
    try {
        const { reportType, s_fio_document } = req.body 
        const result = await academDocsService.academDocRegTable(reportType, s_fio_document);
        res.send(result)
    } catch (err) {
      console.log("AcademDocRegTable error", err.message);
      res.send({ AcademDocRegTable: [] });
    }
  
  });

router.post("/academDocRegTableInsert", async function (req, res, next) {
    try {
      const { selected_id_student, id_academ_document_type, new_uni_number, new_reg_number, give_date, id_AVN_User } = req.body;
      const result = await academDocsService.academDocRegTableInsert(selected_id_student, id_academ_document_type, new_uni_number, new_reg_number, give_date, id_AVN_User);
      res.send(result)
    } catch (err) {
      console.log("academDocRegTableInsert error", err.message);
      res.send({ result: null });
    }
  });
  
router.put("/academDocRegTableUpdate", async function (req, res, next) {
    try {
      const { selected_id_student, id_academ_document_type, new_uni_number, new_reg_number, give_date, id_akadem_document } = req.body;
      const result = await academDocsService.academDocRegTableUpdate(selected_id_student, id_academ_document_type, new_uni_number, new_reg_number, give_date, id_akadem_document);
      res.send(result)
    } catch (err) {
      console.log("academDocRegTableUpdate error", err.message);
      res.send({ result: null });
    }
  });

router.delete("/academDocRegTableDelete", async function (req, res, next) {
    try {
      const { id_academ_document } = req.query;
      const result = await academDocsService.academDocRegTableDelete(id_academ_document)
      res.send(result)
    } catch (err) {
      console.log("academDocRegTableDelete", err.message);
      res.send({ result: null });
    }
  });

module.exports = router