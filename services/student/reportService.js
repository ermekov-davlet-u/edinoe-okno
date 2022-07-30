const { poolPromise } = require("../db");

async function reportTypelist() {
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`SELECT id_okno_document as value, okno_document as label FROM okno_document`);
  
      if (
        r &&
        r.recordset &&
        r.recordset.length
      )
        return({ ReportsList: r.recordset });
      else return({ ReportsList: [] });
    } catch (err) {
      console.log("ReportsList error", err.message);
      return({ ReportsList: [] });
    }
  
  }
  async function reportApplicationWait(reportType) {
    console.log(reportType);
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(reportType > 0 ? `SELECT TOP 25 * FROM [AVN].[dbo].[V_okno_zakaz] where id_okno_document = ${reportType} and date_update is NULL order by date_insert ` :
          `SELECT TOP 25 * FROM [AVN].[dbo].[V_okno_zakaz] where  date_update is NULL order by date_insert `);
  
        if (
            r &&
            r.recordset &&
            r.recordset.length 
        )
        return({ reportApplicationWait: r.recordset });
        else return({ reportApplicationWait: [] });
    } catch (err) {
        console.log("reportApplicationWait error", err.message);
        return({ reportApplicationWait: [] });
    }
  
  }
  async function reportApplicationDone(s_fio_document) {
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(s_fio_document && s_fio_document.length ? `SELECT * FROM [AVN].[dbo].[V_okno_zakaz] where (s_fio like '%${s_fio_document}%' or okno_document like '%${s_fio_document}%') and date_update is not NULL order by date_update DESC
        `: `SELECT TOP 25 * FROM V_okno_zakaz where date_update is not NULL order by date_update DESC`);
  
        if (
            r &&
            r.recordset &&
            r.recordset.length
        )
        return({ reportApplicationDone: r.recordset });
        else return({ reportApplicationDone: [] });
    } catch (err) {
        console.log("reportApplicationDone error", err.message);
        return({ reportApplicationDone: [] });
    }
  
  }
  async function reportApplicationView(id_okno_zakaz) {
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`UPDATE Okno_zakaz
            SET [date_viewed] = (getdate())
            WHERE id_okno_zakaz=${id_okno_zakaz}
        `);
  
        if (r && r.rowsAffected && r.rowsAffected.length)
            return({ result: r.rowsAffected[0] });
        else return({ result: null });
    } catch (err) {
      console.log("reportApplicationUpdate error", err.message);
      return({ result: null });
    }
  
  }
  async function reportApplicationUpdate(id_okno_zakaz, status) {
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`UPDATE Okno_zakaz
        SET [status] = ${status},[date_update] = (getdate())
      WHERE id_okno_zakaz=${id_okno_zakaz}
      `);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("reportApplicationUpdate error", err.message);
      return({ result: null });
    }
  
  }
  
  async function obhodnoiList(id_group, id_student, id_protocols) {
    try {
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
        r.recordsets.length 
      )
        return({ ObhodnoiList: r.recordsets });
      else return({ ObhodnoiList: [] });
    } catch (err) {
      console.log("ObhodnoiList error", err.message);
      return({ ObhodnoiList: [] });
    }
  
  }
  
  async function voenkom(id_group, id_student, id_raion, id_faculty) {
    try {
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
        return({ VoenKom: r.recordsets });
      else return({ VoenKom: [] });
    } catch (err) {
      console.log("VoenKom error", err.message);
      return({ VoenKom: [] });
    }
  
  }
  
  async function studing(id_group, id_student, id_faculty) {
    try {
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
        return({ Studing: r.recordsets });
      else return({ Studing: [] });
    } catch (err) {
      console.log("Studing error", err.message);
      return({ Studing: [] });
    }
  
  }
  
  async function leave(id_student) {
    try {
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
        return({ Leave: r.recordsets });
      else return({ Leave: [] });
    } catch (err) {
      console.log("Leave error", err.message);
      return({ Leave: [] });
    }
  }
  
  module.exports = {
    reportTypelist,
    reportApplicationWait,
    reportApplicationDone,
    reportApplicationView,
    reportApplicationUpdate,
    obhodnoiList,
    voenkom,
    studing,
    leave
  }
