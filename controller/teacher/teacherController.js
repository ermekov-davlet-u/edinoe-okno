const express = require("express")
const router = express.Router()
const teacherService = require("../../services/teacher/teacherService.js")

router.post("/teacher-list", async function (req, res, next) {
    try {
      let result = await teacherService.teacherList()
      res.send(result);
    } catch (err) {
      console.log("TeacherList error", err.message);
      res.send({ TeacherList: [] });
    }
  });
  
  router.post("/teacher-photo", async function (req, res, next) {
    try {
      const { id_teacher } = req.body;
      let result = await teacherService.teacherPhoto(id_teacher)
      res.send(result);
    } catch (err) {
      console.log("teacherPhoto error", err.message);
      res.send({ teacherPhoto: [] });
    }
  
  });
  
  router.post("/okno-properties_teacher", async function (req, res, next) {
    try {
      const { id_teacher } = req.body;
      const result = await teacherService.oknoPropertiesTeacher(id_teacher)
      res.send(result);
    } catch (err) {
      console.log("PropertiesTeacher error", err.message);
      res.send({ PropertiesTeacher: [] });
    }
  });
  
  router.post("/teacher-properties-insert-update", async function (req, res, next) {
    try {
        const result = await teacherService.teacherPropertiesInsertUpdate()
        res.send(result);
    } catch (err) {
      console.log("DescriptionTeacher error", err.message);
      res.send({ DescriptionTeacher: [] });
    }
  
  });

  router.post("/description-teacher-insert", async function (req, res, next) {
    try {
      const { id_teacher, id_user, okno_description } = req.body;
      const result = await teacherService.descriptionTeacherInsert(id_teacher, id_user, okno_description)
      res.send(result);
    } catch (err) {
      console.log("description-teacher insert error", err.message);
      res.send({ result: null });
    }
  });

  router.post("/okno-description-teacher", async function (req, res, next) {
    try {
      const { id_teacher } = req.body;
      const result = await teacherService.oknoDescriptionTeacher(id_teacher)
      res.send(result);
    } catch (err) {
      console.log("DescriptionTeacher error", err.message);
      res.send({ DescriptionTeacher: [] });
    }
  
  });


  
  router.post("/teacher-report", async function (req, res, next) {
    try {
      const { id_teacher } = req.body;
      const result = await teacherService.teacherReport(id_teacher)
      res.send(result);
    } catch (err) {
      console.log("TeacherReport error", err.message);
      res.send({ TeacherReport: [] });
    }
  
  });

  module.exports =  router