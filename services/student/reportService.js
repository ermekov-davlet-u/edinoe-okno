const { poolPromise } = require("../db");
const _ = require("lodash");

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
      ){

      const obj = {
        vuz: r.recordsets[0][0],
        osn: r.recordsets[1][0],
        duty: r.recordsets[2],
        okno: r.recordsets[3],
      }
        return obj;
    }
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
      ){
        const obj = {
          vuz: r.recordsets[0][0],
          studInfo: r.recordsets[1][0],
          trans: r.recordsets[2],
          raion: r.recordsets[3][0],
          pole1: r.recordsets[4][0],
          pole2: r.recordsets[5][0],
          pole3: r.recordsets[6][0],
          pole4: r.recordsets[7][0],
      }
        return(obj);
        }
      else return({ VoenKom: [] });
    } catch (err) {
      console.log("VoenKom error", err.message);
      return({ VoenKom: [] });
    }
  
  }
  
  async function studing(id_group, id_student, id_faculty) {
    try {
      const pool = await poolPromise;
      console.log(id_group, id_student, id_faculty);
      let r = await pool
        .request()
        .query(`
          EXEC SP_BT_student_report_of_studing
              @id_group = ${id_group},
              @id_student = ${id_student},
              @id_faculty = ${id_faculty}
              `
            );
      if (
        r &&
        r.recordsets &&
        r.recordsets.length &&
        r.recordsets[0] &&
        r.recordsets[0].length
      ){
        const obj = {
          vuz: r.recordsets[0][0],
          faculty: r.recordsets[1][0],
          unKnown: r.recordsets[2],
          post: r.recordsets[3][0],
          insPole: r.recordsets[4][0]
        }
        return ( obj );
        }
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
        EXEC	SP_BT_student_report_of_leave  @id_student = ${id_student}`);
  
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

  async function trunscript( id_student, id_group ) {
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`
        EXEC	SP_TRANSCRIPT  @st = ${id_student}, @gr=${id_group}`);
  
      console.log(r.recordsets);
      if (
        r &&
        r.recordsets &&
        r.recordsets.length &&
        r.recordsets[0] &&
        r.recordsets[0].length
      ){
        

      const json = r.recordsets


        const results = await _.chain(json[0])
        .groupBy("id_group")
        .map((value) => ({
            mo: value[0].mo,
            v2: value[0].v2,
            spec: value[0].spec,
            faculty: value[0]['p23-2'],
            s_fio: value[0].s_fio,
            idid: value[0].idid,
            BirthDate: value[0].BirthDate,
            kredits_avg: value[0].kredits_avg,
            kredits_sum: value[0].kredits_sum,
            vxGroup_TR_by_id_a_year: _.chain(value)
                .groupBy("id_a_year")
                .map((by_year) => ({
                    p32: by_year[0].p32,
                    vxGroup_TR_by_id_w_s: _.chain(by_year)
                        .groupBy("ws_sort")
                        // .orderBy('ws_sort', 'desc')
                        .map((by_w_s) => ({
                            p42: by_w_s[0].p42,
                            vxDisciplineList: _.chain(by_w_s)
                                .map((discipline) => ({
                                    p32: discipline.p32,
                                    p42: discipline.p42,
                                    code_discipline: discipline.code_discipline,
                                    p34: discipline.p34,
                                    p30: discipline.p30,
                                    kredits: discipline.kredits,
                                    ekv_num: discipline.ekv_num,
                                    ekv_bukv: discipline.ekv_bukv,
                                    p31: discipline.p31,
                                }))
                                .value()
                        }))
                        .value()
                }))
                .value()
        }))
        .value()
        return({
          obj: results[0],
          dop: results[1]
        });
      }
      else return( [] );
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
    leave,
    trunscript
  }
