const express = require("express")
const router = express.Router()
const teacherService = require("../../services/teacher/teacherService.js")

router.get("/teacher-list", async function (req, res, next) {
    try {
      const { name } = req.query
      let result = await teacherService.teacherList(name)
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
  
  router.get("/okno-properties", async function (req, res, next) {
    try {
      const { id_teacher } = req.query;
      const result = await teacherService.oknoPropertiesTeacher(id_teacher)
      res.send(result);
    } catch (err) {
      console.log("PropertiesTeacher error", err.message);
      res.send({ PropertiesTeacher: [] });
    }
  });
  
  router.post("/teacher-propertiesui", async function (req, res, next) {
    try {
      const { id_teacher,
        t_fio_pole1,
        t_fio_pole2,
        t_fio_pole3,
        t_fio_pole4,
        t_fio_pole5,
        t_fio_pole6,
        t_fio_pole7,
        t_fio_pole8,
        t_fio_pole9,
        AVN_user } = req.body
        console.log(id_teacher,
          t_fio_pole1,
          t_fio_pole2,
          t_fio_pole3,
          t_fio_pole4,
          t_fio_pole5,
          t_fio_pole6,
          t_fio_pole7,
          t_fio_pole8,
          t_fio_pole9,
          AVN_user);
        const result = await teacherService.teacherPropertiesInsertUpdate( id_teacher,
          t_fio_pole1,
          t_fio_pole2,
          t_fio_pole3,
          t_fio_pole4,
          t_fio_pole5,
          t_fio_pole6,
          t_fio_pole7,
          t_fio_pole8,
          t_fio_pole9,
          AVN_user )
        res.send(result);
    } catch (err) {
      console.log("DescriptionTeacher error", err.message);
      res.send({ DescriptionTeacher: [] });
    }
  
  });

  router.post("/description-teacher", async function (req, res, next) {
    try {
      const { id_teacher, id_user, okno_description } = req.body;
      const result = await teacherService.descriptionTeacherInsert(id_teacher, id_user, okno_description)
      res.send(result);
    } catch (err) {
      console.log("description-teacher insert error", err.message);
      res.send({ result: null });
    }
  });

  router.get("/okno-description", async function (req, res, next) {
    try {
      const { id_teacher } = req.query;
      const result = await teacherService.oknoDescriptionTeacher(id_teacher)
      res.send(result);
    } catch (err) {
      console.log("DescriptionTeacher error", err.message);
      res.send({ DescriptionTeacher: [] });
    }
  
  });
  
  router.get("/teacher-report", async function (req, res, next) {
    try {
      const { id_teacher } = req.query;
      const result = await teacherService.teacherReport(id_teacher)
      res.send(result);
    } catch (err) {
      console.log("TeacherReport error", err.message);
      res.send({ TeacherReport: [] });
    }
  });

  
router.delete("/description-teacher", async function (req, res, next) {
  try {
    const { id_okno_description_teacher } = req.query;
    const result = await teacherService.descriptionTeacherDelete(id_okno_description_teacher)
    res.send( result );
  } catch (err) {
    console.log("description-teacher delete error", err.message);
    res.send({ result: null });
  }
});

router.put("/description-teacher", async function (req, res, next) {
  try {
    const { id_teacher, okno_description, id_okno_description_teacher } = req.body;
    let result = await teacherService.descriptionTeacherUpd(id_teacher, okno_description, id_okno_description_teacher)
    res.send( result );
  } catch (err) {
    console.log("description-teacher update error", err.message);
    res.send({ result: null });
  }
});

  module.exports =  router