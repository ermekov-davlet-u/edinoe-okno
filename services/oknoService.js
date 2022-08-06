const { sql, poolPromise } = require('./db')



 async function oknoRole (  ) {
    try {
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
        return({ Okno_role: r.recordset });
      else return({ Okno_role: [] });
    } catch (err) {
      console.log("Okno_role error", err.message);
      return({ Okno_role: [] });
    }
  }
  
  async function avnUsers ( userName ){
    try {
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
        return({ AVN_user_list: r.recordset });
      else return({ AVN_user_list: [] });
    } catch (err) {
      console.log("AVN_user_list error", err.message);
      return({ AVN_user_list: [] });
    }
  }
  
  async function oknoRoleinsert ( id_teacher, ckb, dekanat, KjMTB, obshejitie, biblioteka, Buhgalteriy, pole1, pole2, pole3 ) {
    try {
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
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("okno_role_insert error", err.message);
      return({ result: null });
    }
  }
  
  async function oknoRoleUpdate(ckb, dekanat, KjMTB, obshejitie, biblioteka, Buhgalteriy, pole1, pole2, pole3, id_role_okno) {
    try {
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
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("okno_role_update error", err.message);
      return({ result: null });
    }
  }
  
async function oknoRoleDelete(id) {
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`DELETE FROM [AVN].[dbo].[okno_role]
        WHERE id_role_okno=${id}`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("okno_role_delete error", err.message);
      return({ result: null });
    }
  }
  
  
  async function oknoRoleTeacher() {
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
        return({ Okno_role_teacher: r.recordset });
      else return({ Okno_role_teacher: [] });
    } catch (err) {
      console.log("Okno_role_teacher error", err.message);
      return({ Okno_role_teacher: [] });
    }
  }
  
  async function oknoRoleSotrudnikInsert( id_okno_role_teacher, t_fio_pole1, t_fio_pole2, t_fio_pole3, t_fio_pole4, t_fio_pole5, t_fio_pole6, t_fio_pole7, t_fio_pole8, t_fio_pole9 ) {
    try {

        console.log({ t_fio_pole1, t_fio_pole2, t_fio_pole3, t_fio_pole4, t_fio_pole5, t_fio_pole6, t_fio_pole7, t_fio_pole8, t_fio_pole9, id_okno_role_teacher });
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
              ${id_okno_role_teacher}
              ,${t_fio_pole1 == true ? 1 : 0}
              ,${t_fio_pole2 == true ? 1 : 0}
              ,${t_fio_pole3 == true ? 1 : 0}
              ,${t_fio_pole4 == true ? 1 : 0}
              ,${t_fio_pole5 == true ? 1 : 0}
              ,${t_fio_pole6 == true ? 1 : 0}
              ,${t_fio_pole7 == true ? 1 : 0}
              ,${t_fio_pole8 == true ? 1 : 0}
              ,${t_fio_pole9 == true ? 1 : 0}
             )`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("okno_role_sotrudnik_insert error", err.message);
      return({ result: null });
    }
  }
  
  async function oknoRoleSotrudnikUpdate(t_fio_pole1, t_fio_pole2, t_fio_pole3, t_fio_pole4, t_fio_pole5, t_fio_pole6, t_fio_pole7, t_fio_pole8, t_fio_pole9, id_okno_role_teacher) {
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`UPDATE [AVN].[dbo].[okno_role_teacher]
        SET [t_fio_pole1] = ${t_fio_pole1 == true ? 1 : 0}
           ,[t_fio_pole2] = ${t_fio_pole2 == true ? 1 : 0}
           ,[t_fio_pole3] = ${t_fio_pole3 == true ? 1 : 0}
           ,[t_fio_pole4] = ${t_fio_pole4 == true ? 1 : 0}
           ,[t_fio_pole5] = ${t_fio_pole5 == true ? 1 : 0}
           ,[t_fio_pole6] = ${t_fio_pole6 == true ? 1 : 0}
           ,[t_fio_pole7] = ${t_fio_pole7 == true ? 1 : 0}
           ,[t_fio_pole8] = ${t_fio_pole8 == true ? 1 : 0}
           ,[t_fio_pole9] = ${t_fio_pole9 == true ? 1 : 0}
      WHERE id_okno_role_teacher=${id_okno_role_teacher}`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("okno_role_sotrudnik_update error", err.message);
      return({ result: null });
    }
  }
  
async function oknoRoleSotrudnikDelete( id ) {
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`DELETE FROM [AVN].[dbo].[okno_role_teacher]
        WHERE id_okno_role_teacher=${id}`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("okno_role_sotrudnik_delete error", err.message);
      return({ result: null });
    }
  }
  
async function oknoProportiesList (customer) {
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`SELECT * FROM [AVN].[dbo].[okno_properties]
        WHERE sotrudnik = ${customer}`);
  
      if (
        r &&
        r.recordsets &&
        r.recordsets.length &&
        r.recordsets[0] &&
        r.recordsets[0].length
      )
        return({ Okno_proporties_list: r.recordset });
      else return({ Okno_proporties_list: [] });
    } catch (err) {
      console.log("Okno_proporties_list error", err.message);
      return({ Okno_proporties_list: [] });
    }
  }
  
 async function oknoProportiesUpdate( okno_title, Description, visibility, id_okno_properties ){
    console.log(okno_title, Description, visibility, id_okno_properties);
    try {
      const pool = await poolPromise;
      let r = await pool
        .request()
        .query(`UPDATE [AVN].[dbo].[okno_properties]
        SET [okno_title] = '${okno_title}'
           ,[Description] = '${Description !== null ? Description : ''}'
           ,[visibility] = ${visibility == true ? 1 : 0}
      WHERE id_okno_properties=${id_okno_properties}`);
  
      if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
      else return({ result: null });
    } catch (err) {
      console.log("okno_proporties_update error", err.message);
      return({ result: null });
    }
  }

  module.exports = {
    oknoRole,
    avnUsers,
    oknoRoleinsert,
    oknoRoleUpdate,
    oknoRoleDelete,
    oknoRoleTeacher,
    oknoRoleSotrudnikInsert,
    oknoRoleSotrudnikUpdate,
    oknoRoleSotrudnikDelete,
    oknoProportiesList,
    oknoProportiesUpdate,
  }