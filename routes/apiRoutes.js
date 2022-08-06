var express = require("express");
var router = express.Router();
const { poolPromise } = require("./db");



router.post("/v-okno-sg", async function (req, res, next) {
  try {
    const { id_a_year, id_faculty } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`SELECT * FROM [AVN].[dbo].[V_okno_sg] where id_a_year=${id_a_year} and id_faculty=${id_faculty}`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ V_okno_sg: r.recordset });
    else res.send({ V_okno_sg: [] });
  } catch (err) {
    console.log("V_okno_sg error", err.message);
    res.send({ V_okno_sg: [] });
  }
});
router.post("/correntyear", async function (req, res, next) {
  try {
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`SELECT  id_a_year, p32 FROM dbo.V_GetCurrentAcademicIdYear 
      SELECT  id_ws,ws  FROM dbo.V_GetCurrentAcademicIdWS`);
    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ CorrYear: r.recordsets });
    else res.send({ CorrYear: [] });
  } catch (err) {
    console.log("CorrYear error", err.message);
    res.send({ CorrYear: [] });
  }
});



router.post("/okno_role", async function (req, res, next) {
  try {
    const { search_discipline, pageNum } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`
      SELECT  okno_role.id_role_okno, t_fio.t_fio, okno_role.ckb, okno_role.dekanat, okno_role.KjMTB, okno_role.obshejitie, okno_role.biblioteka, okno_role.Buhgalteriy, okno_role.pole1, okno_role.pole2, 
                okno_role.pole3
      FROM  AVNTeacher INNER JOIN
                t_fio ON AVNTeacher.id_teacher = t_fio.id_teacher INNER JOIN
                okno_role ON AVNTeacher.id_avn_login = okno_role.id_AVN_User
      ORDER BY t_fio.t_fio`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ Okno_role: r.recordsets });
    else res.send({ Okno_role: [] });
  } catch (err) {
    console.log("Okno_role error", err.message);
    res.send({ Okno_role: [] });
  }
});

router.post("/avn_users", async function (req, res, next) {
  try {
    const { userName } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`
      SELECT  AVNTeacher.id_avn_login AS id_teacher, t_fio.t_fio
      FROM  AVNTeacher INNER JOIN  t_fio ON AVNTeacher.id_teacher = t_fio.id_teacher
      WHERE  t_fio like '%${userName}%'                 
      ORDER BY t_fio.t_fio`);
    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ AVN_user_list: r.recordsets });
    else res.send({ AVN_user_list: [] });
  } catch (err) {
    console.log("AVN_user_list error", err.message);
    res.send({ AVN_user_list: [] });
  }
});

router.post("/okno_role_insert", async function (req, res, next) {
  try {
    const { id_teacher, ckb, dekanat, KjMTB, obshejitie, biblioteka, Buhgalteriy, pole1, pole2, pole3 } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`
      INSERT INTO [AVN].[dbo].[okno_role]
           ([id_AVN_User]
           ,[ckb]
           ,[dekanat]
           ,[KjMTB]
           ,[obshejitie]
           ,[biblioteka]
           ,[Buhgalteriy]
           ,[pole1]
           ,[pole2]
           ,[pole3])
     VALUES
           (
            ${id_teacher}
            ,${ckb == true ? 1 : 0}
            ,${dekanat == true ? 1 : 0}
            ,${KjMTB == true ? 1 : 0}
            ,${obshejitie == true ? 1 : 0}
            ,${biblioteka == true ? 1 : 0}
            ,${Buhgalteriy == true ? 1 : 0}
            ,${pole1 == true ? 1 : 0}
            ,${pole2 == true ? 1 : 0}
            ,${pole3 == true ? 1 : 0}
           )`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("okno_role_insert error", err.message);
    res.send({ result: null });
  }
});

router.post("/okno_role_update", async function (req, res, next) {
  try {
    const { ckb, dekanat, KjMTB, obshejitie, biblioteka, Buhgalteriy, pole1, pole2, pole3, id_role_okno } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`UPDATE [AVN].[dbo].[okno_role]
      SET [ckb] = ${ckb == true ? 1 : 0}
         ,[dekanat] = ${dekanat == true ? 1 : 0}
         ,[KjMTB] = ${KjMTB == true ? 1 : 0}
         ,[obshejitie] = ${obshejitie == true ? 1 : 0}
         ,[biblioteka] = ${biblioteka == true ? 1 : 0}
         ,[Buhgalteriy] = ${Buhgalteriy == true ? 1 : 0}
         ,[pole1] = ${pole1 == true ? 1 : 0}
         ,[pole2] = ${pole2 == true ? 1 : 0}
         ,[pole3] = ${pole3 == true ? 1 : 0}
    WHERE id_role_okno=${id_role_okno}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("okno_role_update error", err.message);
    res.send({ result: null });
  }
});

router.post("/okno_role_delete", async function (req, res, next) {
  try {
    const { id_role_okno } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`DELETE FROM [AVN].[dbo].[okno_role]
      WHERE id_role_okno=${id_role_okno}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("okno_role_delete error", err.message);
    res.send({ result: null });
  }
});


router.post("/okno_role_teacher", async function (req, res, next) {
  try {
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`
      SELECT  okno_role_teacher.id_okno_role_teacher,okno_role_teacher.id_AVN_User, t_fio.t_fio, okno_role_teacher.t_fio_pole1, okno_role_teacher.t_fio_pole2, okno_role_teacher.t_fio_pole3, 
      okno_role_teacher.t_fio_pole4, okno_role_teacher.t_fio_pole5, okno_role_teacher.t_fio_pole6, okno_role_teacher.t_fio_pole7, okno_role_teacher.t_fio_pole8, 
      okno_role_teacher.t_fio_pole9
      FROM  AVNTeacher INNER JOIN
                t_fio ON AVNTeacher.id_teacher = t_fio.id_teacher INNER JOIN
                okno_role_teacher ON AVNTeacher.id_avn_login = okno_role_teacher.id_AVN_User
      ORDER BY t_fio.t_fio`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ Okno_role_teacher: r.recordsets });
    else res.send({ Okno_role_teacher: [] });
  } catch (err) {
    console.log("Okno_role_teacher error", err.message);
    res.send({ Okno_role_teacher: [] });
  }
});

router.post("/okno_role_sotrudnik_insert", async function (req, res, next) {
  try {
    const { id_teacher, ckb, dekanat, KjMTB, obshejitie, biblioteka, Buhgalteriy, pole1, pole2, pole3 } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`
      INSERT INTO [AVN].[dbo].[okno_role_teacher]
        ([id_AVN_User]
        ,[t_fio_pole1]
        ,[t_fio_pole2]
        ,[t_fio_pole3]
        ,[t_fio_pole4]
        ,[t_fio_pole5]
        ,[t_fio_pole6]
        ,[t_fio_pole7]
        ,[t_fio_pole8]
        ,[t_fio_pole9])
     VALUES
           (
            ${id_teacher}
            ,${ckb == true ? 1 : 0}
            ,${dekanat == true ? 1 : 0}
            ,${KjMTB == true ? 1 : 0}
            ,${obshejitie == true ? 1 : 0}
            ,${biblioteka == true ? 1 : 0}
            ,${Buhgalteriy == true ? 1 : 0}
            ,${pole1 == true ? 1 : 0}
            ,${pole2 == true ? 1 : 0}
            ,${pole3 == true ? 1 : 0}
           )`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("okno_role_sotrudnik_insert error", err.message);
    res.send({ result: null });
  }
});

router.post("/okno_role_sotrudnik_update", async function (req, res, next) {
  try {
    const { ckb, dekanat, KjMTB, obshejitie, biblioteka, Buhgalteriy, pole1, pole2, pole3, id_role_okno } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`UPDATE [AVN].[dbo].[okno_role_teacher]
      SET [t_fio_pole1] = ${ckb == true ? 1 : 0}
         ,[t_fio_pole2] = ${dekanat == true ? 1 : 0}
         ,[t_fio_pole3] = ${KjMTB == true ? 1 : 0}
         ,[t_fio_pole4] = ${obshejitie == true ? 1 : 0}
         ,[t_fio_pole5] = ${biblioteka == true ? 1 : 0}
         ,[t_fio_pole6] = ${Buhgalteriy == true ? 1 : 0}
         ,[t_fio_pole7] = ${pole1 == true ? 1 : 0}
         ,[t_fio_pole8] = ${pole2 == true ? 1 : 0}
         ,[t_fio_pole9] = ${pole3 == true ? 1 : 0}
    WHERE id_okno_role_teacher=${id_role_okno}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("okno_role_sotrudnik_update error", err.message);
    res.send({ result: null });
  }
});

router.post("/okno_role_sotrudnik_delete", async function (req, res, next) {
  try {
    const { id_role_okno } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`DELETE FROM [AVN].[dbo].[okno_role_teacher]
      WHERE id_okno_role_teacher=${id_role_okno}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("okno_role_sotrudnik_delete error", err.message);
    res.send({ result: null });
  }
});

router.post("/okno_proporties_list", async function (req, res, next) {
  try {
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`SELECT * FROM [AVN].[dbo].[okno_properties]`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ Okno_proporties_list: r.recordsets });
    else res.send({ Okno_proporties_list: [] });
  } catch (err) {
    console.log("Okno_proporties_list error", err.message);
    res.send({ Okno_proporties_list: [] });
  }
});

router.post("/okno_proporties_update", async function (req, res, next) {
  try {
    const { okno_title, Description, visibility, id_okno_properties } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`UPDATE [AVN].[dbo].[okno_properties]
      SET [okno_title] = '${okno_title}'
         ,[Description] = '${Description == null ? Description : ''}'
         ,[visibility] = ${visibility == true ? 1 : 0}
    WHERE id_okno_properties=${id_okno_properties}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("okno_proporties_update error", err.message);
    res.send({ result: null });
  }
});

module.exports = router;
