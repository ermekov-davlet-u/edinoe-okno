var express = require("express");
var router = express.Router();
const { poolPromise } = require("../db");


router.post("/description-insert", async function (req, res, next) {
    try {
      const { id_student, id_user, okno_description } = req.body;
      const pool = await poolPromise;
      let r = await pool.request().query(`INSERT INTO [AVN].[dbo].[okno_description] (id_student,id_user,okno_description)
       VALUES('${id_student}','${id_user}','${okno_description}')`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        res.send({ result: r.rowsAffected[0] });
      else res.send({ result: null });
    } catch (err) {
      console.log("description insert error", err.message);
      res.send({ result: null });
    }
  });
  
  router.post("/description-delete", async function (req, res, next) {
    try {
      const { id_okno_description } = req.body;
      const pool = await poolPromise;
      let r = await pool.request().query(`DELETE FROM [AVN].[dbo].[okno_description] WHERE id_okno_description=${id_okno_description}`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        res.send({ result: r.rowsAffected[0] });
      else res.send({ result: null });
    } catch (err) {
      console.log("description delete error", err.message);
      res.send({ result: null });
    }
  });
  
  router.post("/description-update", async function (req, res, next) {
    try {
      const { id_student, okno_description, id_okno_description } = req.body;
      // console.log('616515616516511111111111111111111111111111111115', req.body)
      const pool = await poolPromise;
      let r = await pool.request().query(`UPDATE [AVN].[dbo].[okno_description]
      SET okno_description = '${okno_description}'
    WHERE id_student =${id_student} and id_okno_description=${id_okno_description}`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        res.send({ result: r.rowsAffected[0] });
      else res.send({ result: null });
    } catch (err) {
      console.log("description update error", err.message);
      res.send({ result: null });
    }
  });
  
  router.post("/okno-description", async function (req, res, next) {
    try {
      const { id_student } = req.body;
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`SELECT * FROM [AVN].[dbo].[okno_description] WHERE id_student = ${id_student}`);
  
      if (
        r &&
        r.recordsets &&
        r.recordsets.length &&
        r.recordsets[0] &&
        r.recordsets[0].length
      )
        res.send({ Description: r.recordset });
      else res.send({ Description: [] });
    } catch (err) {
      console.log("Descriptions error", err.message);
      res.send({ Description: [] });
    }
  
  });