const { sql, poolPromise } = require('./db')

async function eduform(id_a_year, id_faculty) {
    try {

        const pool = await poolPromise;
        const r = await pool
            .request()
            .input('year', sql.Int, id_a_year)
            .input('faculty', sql.Int, id_faculty)
            .query(`SELECT * FROM [AVN].[dbo].[V_okno_sg] where id_a_year=@year and id_faculty=@faculty`);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        ) { return { error: false, data: r.recordset } }

        return { error: true, data: [] };
    } catch (err) {
        return { error: err.message, data: [] };
    }
}

async function educFaculty() {
    try {

        const pool = await poolPromise;
        const r = await pool
            .request()
            .query(`SELECT faculty.id_faculty as value, faculty.[p23-1] as label
            FROM user_faculty INNER JOIN faculty ON user_faculty.faculty = faculty.id_faculty 
            WHERE user_faculty.id_login = 5090 
            GROUP BY faculty.[p23-1], faculty.id_faculty 
            ORDER BY faculty.[p23-1]
        `);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        ) { return { error: false, data: r.recordset } }

        return { error: true, data: [] };
    } catch (err) {
        return { error: err.message, data: [] };
    }
}

async function educFEduc() {
    try {
        const pool = await poolPromise;
        const r = await pool.request().query(`SP_BT_f_educ_select @id_login=5090`)
    if (
        r &&
        r.recordsets &&
        r.recordsets.length &&
        r.recordsets[0] &&
        r.recordsets[0].length
    ) { return { error: false, data: r.recordset } }
    } catch (error) {
        console.log(error.message);
    }
}

async function educRate(){
    try {
        const pool = await poolPromise;
        const r = await pool.request().query(`SELECT  id_rate as value, p22 as label FROM  dbo.rate`)
        if(
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        ){ return { error: false, data: r.recordset } }
    } catch (error) {
        console.log(error.message);
        return error.message
    }
}

async function educGroup(id_year,id_faculty,id_f_educ,id_rate){
    try {
        const pool = await poolPromise;
        const r = await pool.request().query(`exec SP_BT_group_select 
        @id_a_year =${id_year},
        @id_faculty =${id_faculty},
        @id_f_educ =${id_f_educ},
        @id_rate =${id_rate}`)
        if( r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0]
        ){ return { error: false, data: r.recordset } }
    } catch (error) {
        console.log(error.message);
        return error.message
    }
}


module.exports = { eduform, educFaculty, educFEduc, educRate, educGroup }