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

/*******************************Student Reports********************************* */
router.post("/reportslist", async function (req, res, next) {
  try {
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`SELECT *FROM [AVN].[dbo].[okno_document]`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ ReportsList: r.recordset });
    else res.send({ ReportsList: [] });
  } catch (err) {
    console.log("ReportsList error", err.message);
    res.send({ ReportsList: [] });
  }

});
router.post("/reportApplicationWait", async function (req, res, next) {
  try {
    const { reportType } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(reportType > 0 ? `SELECT TOP 25 * FROM [AVN].[dbo].[V_okno_zakaz] where id_okno_document = ${reportType} and date_update is NULL order by date_insert ` :
        `SELECT TOP 25 * FROM [AVN].[dbo].[V_okno_zakaz] where  date_update is NULL order by date_insert `);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ reportApplicationWait: r.recordset });
    else res.send({ reportApplicationWait: [] });
  } catch (err) {
    console.log("reportApplicationWait error", err.message);
    res.send({ reportApplicationWait: [] });
  }

});
router.post("/reportApplicationDone", async function (req, res, next) {
  try {
    const { s_fio_document } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(s_fio_document && s_fio_document.length ? `SELECT * FROM [AVN].[dbo].[V_okno_zakaz] where (s_fio like '%${s_fio_document}%' or okno_document like '%${s_fio_document}%') and date_update is not NULL order by date_update DESC
      `: `SELECT TOP 25 * FROM V_okno_zakaz where date_update is not NULL order by date_update DESC`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ reportApplicationDone: r.recordset });
    else res.send({ reportApplicationDone: [] });
  } catch (err) {
    console.log("reportApplicationDone error", err.message);
    res.send({ reportApplicationDone: [] });
  }

});
router.post("/reportApplicationView", async function (req, res, next) {
  try {
    const { id_okno_zakaz, status } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`UPDATE Okno_zakaz
      SET [date_viewed] = (getdate())
    WHERE id_okno_zakaz=${id_okno_zakaz}
    `);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("reportApplicationUpdate error", err.message);
    res.send({ result: null });
  }

});
router.post("/reportApplicationUpdate", async function (req, res, next) {
  try {
    const { id_okno_zakaz, status } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`UPDATE Okno_zakaz
      SET [status] = ${status},[date_update] = (getdate())
    WHERE id_okno_zakaz=${id_okno_zakaz}
    `);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("reportApplicationUpdate error", err.message);
    res.send({ result: null });
  }

});

router.post("/obhodnoi-list", async function (req, res, next) {
  try {
    const { id_group, id_student, id_protocols } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`exec SP_BT_student_obhodnoi_report 
                          @id_group = ${id_group},
                          @id_student = ${id_student},
                          @id_protocols= ${id_protocols}`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ ObhodnoiList: r.recordsets });
    else res.send({ ObhodnoiList: [] });
  } catch (err) {
    console.log("ObhodnoiList error", err.message);
    res.send({ ObhodnoiList: [] });
  }

});

router.post("/voenkom", async function (req, res, next) {
  try {
    const { id_group, id_student, id_raion, id_faculty } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`
      EXEC SP_BT_student_voencom_report
          @id_group = ${id_group},
          @id_student = ${id_student},
          @id_raion = ${id_raion},
          @id_faculty = ${id_faculty}`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ VoenKom: r.recordsets });
    else res.send({ VoenKom: [] });
  } catch (err) {
    console.log("VoenKom error", err.message);
    res.send({ VoenKom: [] });
  }

});

router.post("/studing", async function (req, res, next) {
  try {
    const { id_group, id_student, id_faculty } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`
      EXEC SP_BT_student_report_of_studing
          @id_group = ${id_group},
          @id_student = ${id_student},
          @id_faculty = ${id_faculty}`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ Studing: r.recordsets });
    else res.send({ Studing: [] });
  } catch (err) {
    console.log("Studing error", err.message);
    res.send({ Studing: [] });
  }

});

router.post("/leave", async function (req, res, next) {
  try {
    const { id_student } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`
      EXEC	SP_BT_student_report_of_leave  @id_student = ${20302}`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ Leave: r.recordsets });
    else res.send({ Leave: [] });
  } catch (err) {
    console.log("Leave error", err.message);
    res.send({ Leave: [] });
  }

});

router.post("/payment", async function (req, res, next) {
  try {
    const { id_student } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`
      exec SP_uch_kart_o  @st= ${id_student}`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ PAYMENT: r.recordsets });
    else res.send({ PAYMENT: [] });
  } catch (err) {
    console.log("PAYMENT error", err.message);
    res.send({ PAYMENT: [] });
  }

});

//------------------------------RegistratorAcademDocument---------------------------////////////
router.post("/searchStudentList", async function (req, res, next) {
  try {
    const { s_fio_document } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`SELECT     TOP (500) CASE WHEN Student.first_p1 IS NULL THEN s_fio.s_fio ELSE '(' + Student.first_p1 + ')' + s_fio.s_fio END AS s_fio, [group].p20, movement.sh_st, 
      faculty.[p23-1], movement.id_student, [group].id_group, [group].id_faculty, ISNULL(S_G.id_student, - 1) AS Expr1
FROM         movement INNER JOIN
      Student ON movement.id_student = Student.id_student INNER JOIN
      s_fio ON movement.id_student = s_fio.id_student INNER JOIN
      [group] ON movement.id_group = [group].id_group INNER JOIN
      faculty ON [group].id_faculty = faculty.id_faculty LEFT OUTER JOIN
      S_G ON Student.id_student = S_G.id_student
WHERE     (s_fio.s_fio LIKE '%' + '${s_fio_document}' + '%') OR
      (Student.first_p1 LIKE '%' + '${s_fio_document}' + '%')
GROUP BY CASE WHEN Student.first_p1 IS NULL THEN s_fio.s_fio ELSE '(' + Student.first_p1 + ')' + s_fio.s_fio END, [group].p20, movement.sh_st, faculty.[p23-1], 
      movement.id_student, [group].id_group, [group].id_faculty, ISNULL(S_G.id_student, - 1)`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ DocumentRegStudentList: r.recordset });
    else res.send({ DocumentRegStudentList: [] });
  } catch (err) {
    console.log("DocumentRegStudentList error", err.message);
    res.send({ DocumentRegStudentList: [] });
  }

});

router.post("/academDocList", async function (req, res, next) {
  try {
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`SELECT * FROM akadem_document_type`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ AcademDocList: r.recordset });
    else res.send({ AcademDocList: [] });
  } catch (err) {
    console.log("AcademDocList error", err.message);
    res.send({ AcademDocList: [] });
  }

});
router.post("/academDocRegTable", async function (req, res, next) {
  try {
    const pool = await poolPromise;
    const { reportType, s_fio_document } = req.body;
    let r = await pool
      .request()
      .query(reportType === 0 && s_fio_document === null ? `SELECT *FROM [AVN].[dbo].[V_akadem_document] order by AVN_date desc` :
        reportType > 0 && s_fio_document === null ? `SELECT *FROM [AVN].[dbo].[V_akadem_document] where id_akadem_document_type =${reportType} order by AVN_date desc` :
          reportType === 0 && s_fio_document && `SELECT *FROM [AVN].[dbo].[V_akadem_document] where s_fio like '%${s_fio_document}%' order by AVN_date desc`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ AcademDocRegTable: r.recordset });
    else res.send({ AcademDocRegTable: [] });
  } catch (err) {
    console.log("AcademDocRegTable error", err.message);
    res.send({ AcademDocRegTable: [] });
  }

});
router.post("/academDocRegTableInsert", async function (req, res, next) {
  try {
    const { selected_id_student, id_academ_document_type, new_uni_number, new_reg_number, give_date, id_AVN_User } = req.body;
    const pool = await poolPromise;
    let r = await pool.request().query(`INSERT INTO akadem_document (id_akadem_document_type,id_student ,document_numer,document_reg_numer,document_date ,id_avn_user)
    VALUES (${id_academ_document_type}, ${selected_id_student}, ${new_uni_number},${new_reg_number}, '${give_date}',  ${id_AVN_User})`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("academDocRegTableInsert error", err.message);
    res.send({ result: null });
  }
});

router.post("/academDocRegTableUpdate", async function (req, res, next) {
  try {
    const { selected_id_student, id_academ_document_type, new_uni_number, new_reg_number, give_date, id_akadem_document } = req.body;
    const pool = await poolPromise;
    let r = await pool.request().query(`
    UPDATE akadem_document
    SET id_student = ${selected_id_student}
        ,id_akadem_document_type = ${id_academ_document_type}
        ,document_numer = ${new_uni_number}
        ,document_reg_numer = ${new_reg_number}
        ,document_date = '${give_date}'
    WHERE id_akadem_document=${id_akadem_document}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("academDocRegTableUpdate error", err.message);
    res.send({ result: null });
  }
});
router.post("/academDocRegTableDelete", async function (req, res, next) {
  try {
    const { id_academ_document } = req.body;
    const pool = await poolPromise;
    let r = await pool.request().query(`DELETE akadem_document WHERE id_akadem_document=${id_academ_document}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("academDocRegTableDelete", err.message);
    res.send({ result: null });
  }
});


/*******************************Teacher********************************* */

router.post("/teacher-list", async function (req, res, next) {
  try {
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`SELECT * FROM [AVN].[dbo].[t_fio] ORDER by t_fio asc`);
    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ TeacherList: r.recordsets });
    else res.send({ TeacherList: [] });
  } catch (err) {
    console.log("TeacherList error", err.message);
    res.send({ TeacherList: [] });
  }
});

router.post("/teacher-photo", async function (req, res, next) {
  try {
    const { id_teacher } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`SELECT * FROM [AVN].[dbo].[Photo] where id_teacher=${id_teacher}`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    ) {
      let teacherPhoto = Buffer.from(r.recordset[0].photo).toString('base64');
      res.send({ teacherPhoto });
    }
    else res.send({ teacherPhoto: [] });
  } catch (err) {
    console.log("teacherPhoto error", err.message);
    res.send({ teacherPhoto: [] });
  }

});

router.post("/okno-properties_teacher", async function (req, res, next) {
  try {
    const { id_teacher } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`exec SP_OknoTeacher @id_teacher = ${id_teacher}`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ PropertiesTeacher: r.recordset });
    else res.send({ PropertiesTeacher: [] });
  } catch (err) {
    console.log("PropertiesTeacher error", err.message);
    res.send({ PropertiesTeacher: [] });
  }
});

router.post("/teacher-properties-insert-update", async function (req, res, next) {
  try {
    const {
      id_teacher,
      t_fio_pole1,
      t_fio_pole2,
      t_fio_pole3,
      t_fio_pole4,
      t_fio_pole5,
      t_fio_pole6,
      t_fio_pole7,
      t_fio_pole8,
      t_fio_pole9,
      AVN_user } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`exec SP_Okno_Sotrudnik_insert_update
      @id_teacher =${id_teacher}
     ,@t_fio_pole1 =${t_fio_pole1}
     ,@t_fio_pole2 =${t_fio_pole2}
     ,@t_fio_pole3 =${t_fio_pole3}
     ,@t_fio_pole4 =${t_fio_pole4}
     ,@t_fio_pole5 =${t_fio_pole5}
     ,@t_fio_pole6 =${t_fio_pole6}
     ,@t_fio_pole7 =${t_fio_pole7}
     ,@t_fio_pole8 =${t_fio_pole8}
     ,@t_fio_pole9 =${t_fio_pole9}
     ,@AVN_user ='${AVN_user}'`);

    if (r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length)
      res.send({ result: r.recordsets });
    else res.send({ result: null });
  } catch (err) {
    console.log("properties-teacher-insert-update error", err.message);
    res.send({ result: null });
  }

});
router.post("/description-teacher-insert", async function (req, res, next) {
  try {
    const { id_teacher, id_user, okno_description } = req.body;
    const pool = await poolPromise;
    let r = await pool.request().query(`INSERT INTO [AVN].[dbo].[okno_description_teacher](id_teacher,id_user,okno_description)
    VALUES('${id_teacher}','${id_user}','${okno_description}')`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("description-teacher insert error", err.message);
    res.send({ result: null });
  }
});

router.post("/description-teacher-delete", async function (req, res, next) {
  try {
    const { id_okno_description_teacher } = req.body;
    const pool = await poolPromise;
    let r = await pool.request().query(`DELETE FROM [AVN].[dbo].[okno_description_teacher] WHERE id_okno_description_teacher=${id_okno_description_teacher}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("description-teacher delete error", err.message);
    res.send({ result: null });
  }
});

router.post("/description-teacher-update", async function (req, res, next) {
  try {
    const { id_teacher, okno_description, id_okno_description_teacher } = req.body;
    const pool = await poolPromise;
    let r = await pool.request().query(`UPDATE [AVN].[dbo].[okno_description_teacher]
    SET okno_description = '${okno_description}'
  WHERE id_teacher =${id_teacher} and id_okno_description_teacher=${id_okno_description_teacher}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("description-teacher update error", err.message);
    res.send({ result: null });
  }
});

router.post("/okno-description-teacher", async function (req, res, next) {
  try {
    const { id_teacher } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`SELECT * FROM [AVN].[dbo].[okno_description_teacher] WHERE id_teacher = ${id_teacher}`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ DescriptionTeacher: r.recordset });
    else res.send({ DescriptionTeacher: [] });
  } catch (err) {
    console.log("DescriptionTeacher error", err.message);
    res.send({ DescriptionTeacher: [] });
  }

});

router.post("/teacher-report", async function (req, res, next) {
  try {
    const { id_teacher } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`
      EXEC	SP_BT_teacher_report
          @id_teacher = ${id_teacher}`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ TeacherReport: r.recordsets });
    else res.send({ TeacherReport: [] });
  } catch (err) {
    console.log("TeacherReport error", err.message);
    res.send({ TeacherReport: [] });
  }

});

/****************************************************************** */
router.post("/Okno_dopolnitelno", async function (req, res, next) {
  try {
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`SELECT * FROM [AVN].[dbo].[Okno_dopolnitelno]`);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ Okno_dopolnitelno: r.recordsets });
    else res.send({ Okno_dopolnitelno: [] });
  } catch (err) {
    console.log("Okno_dopolnitelno error", err.message);
    res.send({ Okno_dopolnitelno: [] });
  }

});

router.post("/Okno_dopolnitelno-update", async function (req, res, next) {
  try {
    const { insert_pole, insert_pole_kg, id_okno_dopolnitelno } = req.body;
    const pool = await poolPromise;
    let r = await pool.request().query(`UPDATE [AVN].[dbo].[Okno_dopolnitelno]
    SET [insert_pole] = '${insert_pole}'
       ,[insert_pole_kg] = '${insert_pole_kg}'
  WHERE id_okno_dopolnitelno =${id_okno_dopolnitelno}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("Okno_dopolnitelno update error", err.message);
    res.send({ result: null });
  }
});

router.post("/special", async function (req, res, next) {
  try {
    const { search_special, pageNum } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(search_special ? `SELECT * FROM [AVN].[dbo].[special] where [p25-2] like '%${search_special}%'` :
        `exec SP_Special_Pagination @pageNum  = ${pageNum} ,@pageSize  =20 `);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ SpecialList: r.recordsets });
    else res.send({ SpecialList: [] });
  } catch (err) {
    console.log("SpecialList error", err.message);
    res.send({ SpecialList: [] });
  }

});

router.post("/special-update", async function (req, res, next) {
  try {
    const { id_AVN_User, setAcademKG, setAcademEN, id_special } = req.body;
    const pool = await poolPromise;
    let r = await pool.request().query(`UPDATE [AVN].[dbo].[special]
    SET 
       p25_2k = '${setAcademKG}'
       ,p25_2_en = '${setAcademEN}'
  WHERE id_special=${id_special}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("special update error", err.message);
    res.send({ result: null });
  }
});


router.post("/direction", async function (req, res, next) {
  try {
    const { search_direction, pageNum } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(search_direction ? `SELECT * FROM [AVN].[dbo].[direction]where [p24-2] like '%${search_direction}%'` :
        `exec SP_Direction_Pagination @pageNum  = ${pageNum} ,@pageSize  =20 `);
    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ DirectionList: r.recordsets });
    else res.send({ DirectionList: [] });
  } catch (err) {
    console.log("DirectionList error", err.message);
    res.send({ DirectionList: [] });
  }

});

router.post("/direction-update", async function (req, res, next) {
  try {
    const { id_AVN_User, setAcademKG, setAcademEN, id_direction } = req.body;
    const pool = await poolPromise;
    let r = await pool.request().query(`UPDATE [AVN].[dbo].[direction]
    SET 
       [p24-2_kg] = '${setAcademKG}'
       ,[p24_2_en] = '${setAcademEN}'
  WHERE id_direction=${id_direction}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("direction update error", err.message);
    res.send({ result: null });
  }
});



router.post("/discipline", async function (req, res, next) {
  try {
    const { search_discipline, pageNum } = req.body;
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(search_discipline ? `SELECT * FROM [AVN].[dbo].[discipline]where p34 like '%${search_discipline}%'` :
        `exec SP_Discipline_Pagination @pageNum  = ${pageNum} ,@pageSize  =20 `);

    if (
      r &&
      r.recordsets &&
      r.recordsets.length &&
      r.recordsets[0] &&
      r.recordsets[0].length
    )
      res.send({ DisciplineList: r.recordsets });
    else res.send({ DisciplineList: [] });
  } catch (err) {
    console.log("DisciplineList error", err.message);
    res.send({ DisciplineList: [] });
  }

});

router.post("/discipline-update", async function (req, res, next) {
  try {
    const { id_AVN_User, setAcademKG, setAcademEN, id_discipline } = req.body;
    const pool = await poolPromise;
    let r = await pool.request().query(`UPDATE [AVN].[dbo].[discipline]
    SET 
       p34_kg = '${setAcademKG}'
       ,p34_en = '${setAcademEN}'
  WHERE id_discipline=${id_discipline}`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      res.send({ result: r.rowsAffected[0] });
    else res.send({ result: null });
  } catch (err) {
    console.log("discipline update error", err.message);
    res.send({ result: null });
  }
});

/************************************************************************************* */

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
