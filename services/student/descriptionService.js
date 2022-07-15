const { poolPromise } = require("../db");


async function descriptionInsert(id_student, id_user, okno_description){
    try {
      const pool = await poolPromise;
      let r = await pool.request().query(`INSERT INTO [AVN].[dbo].[okno_description] (id_student,id_user,okno_description)
       VALUES('${id_student}','${id_user}','${okno_description}')`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("description insert error", err.message);
      return({ result: null });
    }
  }
  
async function descriptionDelete(id_okno_description){
    try {
        const pool = await poolPromise;
        let r = await pool.request().query(`DELETE FROM [AVN].[dbo].[okno_description] WHERE id_okno_description=${id_okno_description}`);
    
        if (r && r.rowsAffected && r.rowsAffected.length)
            return({ result: r.rowsAffected[0] });
        else return({ result: null });
    } catch (err) {
        console.log("description delete error", err.message);
        return({ result: null });
    }
  }
  
async function descriptionUpdate(id_student, okno_description, id_okno_description){
    try {
      const pool = await poolPromise;
      let r = await pool.request().query(`UPDATE [AVN].[dbo].[okno_description]
      SET okno_description = '${okno_description}'
    WHERE id_student =${id_student} and id_okno_description=${id_okno_description}`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("description update error", err.message);
      return({ result: null });
    }
  }
  
async function descriptionOkno(id_student){
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`SELECT * FROM [AVN].[dbo].[okno_description] WHERE id_student = ${id_student}`);
  
      if (
        r &&
        r.recordsets &&
        r.recordsets.length &&
        r.recordsets[0]
      )
        return({ Description: r.recordset });
      else return({ Description: [] });
    } catch (err) {
      console.log("Descriptions error", err.message);
      return({ Description: [] });
    }
  
  }

module.exports = { descriptionInsert,
    descriptionDelete,
    descriptionUpdate,
    descriptionOkno }