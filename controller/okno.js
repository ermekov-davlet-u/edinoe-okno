
const router = require('express').Router();
const oknoService = require('../services/oknoService')


router.get("/student", async function (req, res, next) {
    try {
        const result = await oknoService.oknoRole()
        res.send(result);
    } catch (err) {
      console.log("Okno_role error", err.message);
      res.send({ Okno_role: [] });
    }
  });
  
  router.get("/avn_users", async function (req, res, next) {
    try {
        const { userName } = req.query;
        const result = await oknoService.avnUsers(userName)
        res.send(result);
    } catch (err) {
      console.log("AVN_user_list error", err.message);
      res.send({ AVN_user_list: [] });
    }
  });
  
  router.post("/student", async function (req, res, next) {
    try {
        const { id_teacher, ckb, dekanat, KjMTB, obshejitie, biblioteka, Buhgalteriy, pole1, pole2, pole3 } = req.body;
        const result = await oknoService.oknoRoleinsert(id_teacher, ckb, dekanat, KjMTB, obshejitie, biblioteka, Buhgalteriy, pole1, pole2, pole3)
        res.send(result);
    } catch (err) {
      console.log("okno_role_insert error", err.message);
      res.send({ result: null });
    }
  });
  
  router.put("/student", async function (req, res, next) {
    try {
        const { ckb, dekanat, KjMTB, obshejitie, biblioteka, Buhgalteriy, pole1, pole2, pole3, id_role_okno } = req.body;
        const result = await oknoService.oknoRoleUpdate(ckb, dekanat, KjMTB, obshejitie, biblioteka, Buhgalteriy, pole1, pole2, pole3, id_role_okno)
        res.send(result);
    } catch (err) {
      console.log("okno_role_update error", err.message);
      res.send({ result: null });
    }
  });
  
  router.delete("/student", async function (req, res, next) {
    try {
        const { id } = req.query;
        const result = await oknoService.oknoRoleDelete(id)
        res.send(result);
    } catch (err) {
      console.log("okno_role_delete error", err.message);
      res.send({ result: null });
    }
  });
  
  
  router.get("/teacher", async function (req, res, next) {
    try {
        const result = await oknoService.oknoRoleTeacher()
        res.send(result);
    } catch (err) {
      console.log("Okno_role_teacher error", err.message);
      res.send({ Okno_role_teacher: [] });
    }
  });
  
  router.post("/customer", async function (req, res, next) {
    try {
        const { t_fio_pole1, t_fio_pole2, t_fio_pole3, t_fio_pole4, t_fio_pole5, t_fio_pole6, t_fio_pole7, t_fio_pole8, t_fio_pole9, id_okno_role_teacher } = req.body;

        const result = await oknoService.oknoRoleSotrudnikInsert(id_okno_role_teacher, t_fio_pole1, t_fio_pole2, t_fio_pole3, t_fio_pole4, t_fio_pole5, t_fio_pole6, t_fio_pole7, t_fio_pole8, t_fio_pole9)
        res.send( result);
    } catch (err) {
      console.log("okno_role_sotrudnik_insert error", err.message);
      res.send({ result: null });
    }
  });
  
  router.put("/customer", async function (req, res, next) {
    try {
        const { t_fio_pole1, t_fio_pole2, t_fio_pole3, t_fio_pole4, t_fio_pole5, t_fio_pole6, t_fio_pole7, t_fio_pole8, t_fio_pole9, id_okno_role_teacher } = req.body;
        console.log( t_fio_pole1, t_fio_pole2, t_fio_pole3, t_fio_pole4, t_fio_pole5, t_fio_pole6, t_fio_pole7, t_fio_pole8, t_fio_pole9, id_okno_role_teacher );
        const result = await oknoService.oknoRoleSotrudnikUpdate(t_fio_pole1, t_fio_pole2, t_fio_pole3, t_fio_pole4, t_fio_pole5, t_fio_pole6, t_fio_pole7, t_fio_pole8, t_fio_pole9, id_okno_role_teacher)
        res.send(result);
    } catch (err) {
      console.log("okno_role_sotrudnik_update error", err.message);
      res.send({ result: null }); 
    }
  });
  
  router.delete("/customer", async function (req, res, next) {
    try {
        const { id } = req.query;
        const result = await oknoService.oknoRoleSotrudnikDelete(id)
        res.send( result);
    } catch (err) {
      console.log("okno_role_sotrudnik_delete error", err.message);
      res.send({ result: null });
    }
  });
  
  router.get("/accept/proporties", async function (req, res, next) {
    try {
        const { customer } = req.query;
        const result = await oknoService.oknoProportiesList(customer)
        res.send(result);
    } catch (err) {
      console.log("Okno_proporties_list error", err.message);
      res.send({ Okno_proporties_list: [] });
    }
  });
  
  router.put("/accept/proporties", async function (req, res, next) {
    try {
        const { okno_title, Description, visibility, id_okno_properties } = req.body;
        const result = await oknoService.oknoProportiesUpdate(okno_title, Description, visibility, id_okno_properties)
        res.send(result);
    } catch (err) {
      console.log("okno_proporties_update error", err.message);
      res.send({ result: null });
    }
  });

  module.exports = router