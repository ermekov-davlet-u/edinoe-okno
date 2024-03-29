const { poolPromise } = require("../db");
async function teacherList(name){
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`SELECT * 
        FROM [AVN].[dbo].[t_fio] 
        WHERE t_fio LIKE '${name}%' 
        ORDER by t_fio asc`);
      if (
        r &&
        r.recordset &&
        r.recordset.length 
      )
        return({ TeacherList: r.recordset });
      else return({ TeacherList: [] });
    } catch (err) {
      console.log("TeacherList error", err.message);
      return({ TeacherList: [] });
    }
}
  
  
async function teacherPhoto(id_teacher){
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`SELECT * FROM [AVN].[dbo].[Photo] where id_teacher=${id_teacher}`);
  
      if (
        r &&
        r.recordset &&
        r.recordset.length 
      ) {
        let teacherPhoto =  Buffer.from(r.recordset[0].photo).toString('base64');
        return({ teacherPhoto });
      }
      else return({ teacherPhoto: "" });
    } catch (err) {
      console.log("teacherPhoto error", err.message);
      return({ teacherPhoto: [] });
    }
  
  }
  
  
async function oknoPropertiesTeacher(id_teacher){
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`exec SP_OknoTeacher @id_teacher = ${id_teacher}`);
  
      if (
        r &&
        r.recordset &&
        r.recordset.length 
      )
        return({ PropertiesTeacher: r.recordset });
      else return({ PropertiesTeacher: [] });
    } catch (err) {
      console.log("PropertiesTeacher error", err.message);
      return({ PropertiesTeacher: [] });
    }
  }
  

async function teacherPropertiesInsertUpdate(id_teacher,
  t_fio_pole1,
  t_fio_pole2,
  t_fio_pole3,
  t_fio_pole4,
  t_fio_pole5,
  t_fio_pole6,
  t_fio_pole7,
  t_fio_pole8,
  t_fio_pole9,
  AVN_user){
    try {
      console.log(id_teacher,
        t_fio_pole1,
        t_fio_pole2,
        t_fio_pole3,
        t_fio_pole4,
        t_fio_pole5,
        t_fio_pole6,
        t_fio_pole7,
        t_fio_pole8,
        t_fio_pole9);
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
       ,@AVN_user =5090`);
      console.log(r);
      if (r &&
        r.recordset &&
        r.recordset.length )
        return({ result: r.recordset[0]});
      else return({ result: null });
    } catch (err) {
      console.log("properties-teacher-insert-update error", err.message);
      return({ result: null });
    }
  
  }
async function descriptionTeacherUpd(id_teacher, okno_description, id_okno_description_teacher ){
    try {
      const pool = await poolPromise;
      let r = await pool.request().query(`UPDATE okno_description_teacher SET okno_description = '${okno_description}'
      WHERE id_okno_description_teacher = ${id_okno_description_teacher}`);
      if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("description-teacher insert error", err.message);
      return({ result: null });
    }
  }

async function descriptionTeacherInsert(id_teacher, id_user, okno_description){
  try {
    const pool = await poolPromise;
    let r = await pool.request().query(`INSERT INTO [AVN].[dbo].[okno_description_teacher](id_teacher,id_user,okno_description)
    VALUES(${id_teacher},${id_user},'${okno_description}')`);

    if (r && r.rowsAffected && r.rowsAffected.length)
      return({ result: r.rowsAffected[0] });
    else return({ result: null });
  } catch (err) {
    console.log("description-teacher insert error", err.message);
    return({ result: null });
  }
}
  
async function descriptionTeacherDelete(id_teacher){
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`
        DELETE okno_description_teacher
        WHERE id_okno_description_teacher = ${id_teacher}`);
      if (
        r
      )
        return({ result: r.rowsAffected });
      else return({ TeacherReport: [] });
    } catch (err) {
      console.log("TeacherReport error", err.message);
      return({ TeacherReport: [] });
    }
  
  }

async function oknoDescriptionTeacher(id_teacher){
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`SELECT * FROM [AVN].[dbo].[okno_description_teacher] WHERE id_teacher = ${id_teacher}`);
  
      if (
        r &&
        r.recordset &&
        r.recordset.length 
      )
        return({ DescriptionTeacher: r.recordset });
      else return({ DescriptionTeacher: [] });
    } catch (err) {
      console.log("DescriptionTeacher error", err.message);
      return({ DescriptionTeacher: [], error: err.message });
  }
}
  
  

async function teacherReport(id_teacher){
  try {
    const pool = await poolPromise;
    let r = await pool
      .request()
      .query(`
      EXEC	SP_BT_teacher_report
          @id_teacher = ${id_teacher}`);
    if (
      r &&
      r.recordsets &&
      r.recordsets.length 
    ){
      const obj = {
        vuz: r.recordsets[0][0],
        osn: r.recordsets[1][0],
        duty: r.recordsets[2]
      }
      return(obj);
    }
    else return({ TeacherReport: [] });
  } catch (err) {
    console.log("TeacherReport error", err.message);
    return({ TeacherReport: [] });
  }
}

module.exports = {
    teacherList,
    teacherPhoto,
    oknoPropertiesTeacher,
    teacherPropertiesInsertUpdate,
    descriptionTeacherInsert,
    descriptionTeacherUpd,
    descriptionTeacherDelete,
    oknoDescriptionTeacher,
    teacherReport
}

