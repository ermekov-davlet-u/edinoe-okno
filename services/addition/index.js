const { sql, poolPromise } = require('../db')

async function getOkno(){
    try{
        const pool = await poolPromise;
        let r = await pool
          .request()
          .query(`SELECT *, id_okno_dopolnitelno as id FROM [AVN].[dbo].[Okno_dopolnitelno]`);
    
        if (
          r &&
          r.recordsets &&
          r.recordsets.length &&
          r.recordsets[0] &&
          r.recordsets[0].length
        )
          return({ Okno_dopolnitelno: r.recordset });
        else return({ Okno_dopolnitelno: [] });
    } catch (err) {
        console.log("Okno_dopolnitelno error", err.message);
        return({ Okno_dopolnitelno: [] });
    }
}


async function setOkno(insert_pole, insert_pole_kg, id_okno_dopolnitelno){
    try {
        const pool = await poolPromise;
        let r = await pool.request().query(`UPDATE [AVN].[dbo].[Okno_dopolnitelno]
            SET [insert_pole] = '${insert_pole}'
                ,[insert_pole_kg] = '${insert_pole_kg}'
            WHERE id_okno_dopolnitelno =${id_okno_dopolnitelno}`);

        if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
        else return({ result: null });
    } catch (err) {
        console.log("Okno_dopolnitelno update error", err.message);
        return({ result: null });
    }
}
  
async function getSpecial(search_special, pageNum) {
    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(search_special ? `SELECT *, id_special as id, [p25-2] as p24, p25_2k as p24_kg FROM [AVN].[dbo].[special] where [p25-2] like '%${search_special}%'` :
                `exec SP_Special_Pagination @pageNum  = ${pageNum} ,@pageSize  =20 `);

        if (
        r &&
        r.recordsets &&
        r.recordsets.length &&
        r.recordsets[0] &&
        r.recordsets[0].length
        )
        return({ SpecialList: r.recordset });
        else return({ SpecialList: [] });
    } catch (err) {
        console.log("SpecialList error", err.message);
        return({ SpecialList: [] });
    }
}
  
async function setSpecial(id_AVN_User, setAcademKG, setAcademEN, id_special) {
    try {
        const pool = await poolPromise;
        let r = await pool.request().query(`UPDATE [AVN].[dbo].[special]
            SET 
                p25_2k = '${setAcademKG}'
                ,p25_2_en = '${setAcademEN}'
            WHERE id_special=${id_special}`);

        if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
        else return({ result: null });
    } catch (err) {
        console.log("special update error", err.message);
        return({ result: null });
    }
}
  
  
async function getDirection(search_direction, pageNum) {

    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(search_direction ? `SELECT *, id_direction  as id, [p24-2] as p24, [p24-2_kg] as p24_kg FROM [AVN].[dbo].[direction]where [p24-2] like '%${search_direction}%'` :
                `exec SP_Direction_Pagination @pageNum  = ${pageNum} ,@pageSize  =20 `);
        if (
        r &&
        r.recordsets &&
        r.recordsets.length &&
        r.recordsets[0] &&
        r.recordsets[0].length
        )
        return({ DirectionList: r.recordset});
        else return({ DirectionList: [] });
    } catch (err) {
        console.log("DirectionList error", err.message);
        return({ DirectionList: [] });
    }
}
  
async function setDirection(id_AVN_User, setAcademKG, setAcademEN, id_direction) {
    try {
        const pool = await poolPromise;
        let r = await pool.request().query(`UPDATE [AVN].[dbo].[direction]
            SET 
                [p24-2_kg] = '${setAcademKG}'
                ,[p24-2_en] = '${setAcademEN}'
            WHERE id_direction=${id_direction}`);

        if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
        else return({ result: null });
    } catch (err) {
        console.log("direction update error", err.message);
        return({ result: null });
    }
}
  
  
async function getDiscipline(search_discipline, pageNum){
    try {
        const pool = await poolPromise;
        let r = await pool
        .request()
        .query(search_discipline ? `SELECT *, id_discipline as id, [p34] as p24, [p34_kg] as p24_kg FROM [AVN].[dbo].[discipline]where p34 like '%${search_discipline}%'` :
            `exec SP_Discipline_Pagination @pageNum  = ${pageNum} ,@pageSize  =20 `);

        if (
        r &&
        r.recordsets &&
        r.recordsets.length &&
        r.recordsets[0] &&
        r.recordsets[0].length
        )
        return({ DisciplineList: r.recordset });
        else return({ DisciplineList: [] });
    } catch (err) {
        console.log("DisciplineList error", err.message);
        return({ DisciplineList: [] });
    }
}
  
async function setDiscipline(id_AVN_User, setAcademKG, setAcademEN, id_discipline) {
    try {
        const pool = await poolPromise;
        let r = await pool.request().query(`UPDATE [AVN].[dbo].[discipline]
        SET 
            p34_kg = '${setAcademKG}'
            ,[p24-2_en] = '${setAcademEN}'
    WHERE id_discipline=${id_discipline}`);

        if (r && r.rowsAffected && r.rowsAffected.length)
        return({ result: r.rowsAffected[0] });
        else return({ result: null });
    } catch (err) {
        console.log("discipline update error", err.message);
        return({ result: null });
    }
}

module.exports = {
    getOkno,
    setOkno,
    getSpecial,
    setSpecial,
    getDirection,
    setDirection,
    getDiscipline,
    setDiscipline
}


