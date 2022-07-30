const { sql, poolPromise } = require('../db')



async function searchStudentList( s_fio_document ){
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`SELECT     TOP (500) CASE WHEN Student.first_p1 IS NULL THEN s_fio.s_fio ELSE '(' + Student.first_p1 + ')' + s_fio.s_fio END AS s_fio, [group].p20, movement.sh_st, 
                    faculty.[p23-1] as faculty, movement.id_student, [group].id_group, [group].id_faculty, ISNULL(S_G.id_student, - 1) AS Expr1
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
        r.recordset &&
        r.recordset.length
      )
        return({ DocumentRegStudentList: r.recordset });
      else return({ DocumentRegStudentList: [] });
    } catch (err) {
      console.log("DocumentRegStudentList error", err.message);
      return({ DocumentRegStudentList: [] });
    }
  }
  
  async function academDocList(){
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`SELECT id_akadem_document_type as value, akadem_document_type as label FROM akadem_document_type`);
  
      if (
        r &&
        r.recordset &&
        r.recordset.length 
      )
        return({ AcademDocList: r.recordset });
      else return({ AcademDocList: [] });
    } catch (err) {
      console.log("AcademDocList error", err.message);
      return({ AcademDocList: [] });
    }
  }

  async function academDocRegTable( reportType, s_fio_document ){
    try {
      const pool = await poolPromise;
      console.log(reportType, s_fio_document);
      let r = await pool
        .request()
        .query(reportType === 0 && s_fio_document === null ? `SELECT *FROM [AVN].[dbo].[V_akadem_document] order by AVN_date desc` :
          reportType > 0 && s_fio_document === null ? `SELECT *FROM [AVN].[dbo].[V_akadem_document] where id_akadem_document_type =${reportType} order by AVN_date desc` :
            reportType === 0 && s_fio_document && `SELECT *FROM [AVN].[dbo].[V_akadem_document] where s_fio like '%${s_fio_document}%' order by AVN_date desc`);
  
      if (
        r &&
        r.recordset &&
        r.recordset.length 
      )
        return({ AcademDocRegTable: r.recordset });
      else return({ AcademDocRegTable: [] });
    } catch (err) {
      console.log("AcademDocRegTable error", err.message);
      return({ AcademDocRegTable: [] });
    }
  }

  async function academDocRegTableInsert( selected_id_student, id_academ_document_type, new_uni_number, new_reg_number, give_date, id_AVN_User ){
    try {
      const pool = await poolPromise;
      let r = await pool.request().query(`INSERT INTO akadem_document (id_akadem_document_type,id_student ,document_numer,document_reg_numer,document_date ,id_avn_user)
      VALUES (${id_academ_document_type}, ${selected_id_student}, '${new_uni_number}','${new_reg_number}', '${give_date}',  ${id_AVN_User})`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("academDocRegTableInsert error", err.message);
      return({ result: null });
    }
  }
  
  async function academDocRegTableUpdate( selected_id_student, id_academ_document_type, new_uni_number, new_reg_number, give_date, id_akadem_document ){
    try {
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
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("academDocRegTableUpdate error", err.message);
      return({ result: null });
    }
  }

  async function academDocRegTableDelete(id_academ_document){
    try {
      const pool = await poolPromise;
      let r = await pool.request().query(`DELETE akadem_document WHERE id_akadem_document=${id_academ_document}`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("academDocRegTableDelete", err.message);
      return({ result: null });
    }
  }

  module.exports = {
    searchStudentList,
    academDocList,
    academDocRegTable,
    academDocRegTableInsert,
    academDocRegTableUpdate,
    academDocRegTableDelete
  }     