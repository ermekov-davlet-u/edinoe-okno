const { poolPromise } = require("../db");


async function getStudList(id_a_year, id_f_educ, id_faculty, id_rate, id_group){
    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`EXEC SP_BT_student_select 
                @id_a_year =${id_a_year} 
                , @id_f_educ=${id_f_educ} 
                , @id_faculty=${id_faculty}
                , @id_rate= ${id_rate} 
                , @id_group=${id_group}
            `);
        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] 
        )return({ StudentList: r.recordset });
        else return({ StudentList: [] });
    } catch (err) {
        console.log("studentlist error", err.message);
        return({ StudentList: [] });
    }
}

async function getStudent(SearchNameSt){
    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(
                (`EXEC SP_BT_select   @id_login =5090, @s_fio='${SearchNameSt}', @dekanat=1`)
            );
        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0]) return({ StudentListName: r.recordset });
        else return({ StudentListName: [] });
    } catch (err) {
        console.log("StudentListName error", err.message);
        return({ StudentListName: [] });
    }
}

module.exports = { getStudList, getStudent }
