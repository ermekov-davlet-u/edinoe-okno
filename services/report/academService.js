const { sql, poolPromise } = require('../db')

async function getStudentCome(id) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('student_id', sql.Int, id)
            .query('exec SP_akadem_student_come @st=@student_id')
        // exec SP_akadem_student_come @st= 35058;
        // console.dir(result)
        if (result && result.recordsets && result.recordsets.length && result.recordsets[0] && result.recordsets[0].length) {
            const { s_fio: name, v2: university, v2_k: university_kg, come_date, come_reg_date, Atestat, NumberAD, YearTerminations: graduated_date, BirthDate: birth_date } = result.recordsets[0][0]
            // id_student, s_fio, v2, v2_k, v5, semester, come_date, come_reg_date, Atestat, NumberAD, YearTerminations, BirthDate
            const doc = Atestat ? NumberAD === 'СП' ? "Cвидетельство об основном общем образовании" : "Аттестат о среднем общем образовании" : "Диплом"
            const doc_kg = Atestat ? NumberAD === 'СП' ? "Күбɵлүк" : "Жалпы орто билим жөнүндө аттестат" : "Диплом"
            const data = { name, birth_date, doc, doc_kg, graduated_date, come_date, come_reg_date, university, university_kg }
            // console.dir(data)
            return data;
        } else {
            // // console.log('error, no data')
            return 500;
        }
    } catch (err) {
        // // console.log('error, no data', err)
        return 500;
    }
}
async function getStudentLeave(id, gid) {

    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('student_id', sql.Int, id)
            .input('group_id', sql.Int, gid)
            .query('exec SP_akadem_student_leave @st=@student_id, @gr=@group_id')
        // exec SP_akadem_student_leave @st= 35058, @gr=1601;
        // console.dir(result)
        if (result && result.recordsets && result.recordsets.length && result.recordsets[0] && result.recordsets[0].length) {
            const { direction_ru: direction, direction_kg, special_ru: special, special_kg, akadem, max_rate_ru: max_rate, max_rate_kg, akadem_kg, id_rate, leave, leave_date_year: leave_year, leave_reg, leave_date, leave_kg, leave_k } = result.recordsets[0][0]
            //  id_student, direction_ru, direction_kg, special_ru, special_kg, akadem, max_rate_ru, max_rate_kg, akadem_kg, id_rate, leave, leave_date_year, leave_reg, leave_date, leave_kg, leave_k
            const data = { direction, direction_kg, special, special_kg, akadem, max_rate, max_rate_kg, akadem_kg, id_rate, leave, leave_year, leave_reg, leave_date, leave_kg, leave_k }
            // console.dir(data)

            return data;
        } else {
            // // console.log('error, no data')
            return 500;
        }
    } catch (err) {
        // // console.log('error, no data', err)
        return 500;
    }
}
async function getStudentExam(id, gid) {
    try {
        const pool = await poolPromise
        let result = await pool.request()
            .input('student_id', sql.Int, id)
            .input('group_id', sql.Int, gid)
            .query('exec SP_akadem_student_gos_discipline @st=@student_id, @gr=@group_id')
        // exec SP_akadem_student_gos_discipline @st= 35058, @gr=1601;
        // console.dir(result)
        if (result && result.recordsets && result.recordsets.length && result.recordsets[0] && result.recordsets[0].length) {
            // id_student, id_semester, p34, p34_kg, ved2, p31k
            result.recordsets[0].sort(function (a, b) {
                return (a.id_semester > b.id_semester) ? 1 : -1;
            });

            if (result.recordsets[0].length === 1) {
                const { p34: exam_one1, p34_kg: exam_one_kg1, ved2: exam_one_mark1, p31k: exam_one_mark_kg1 } = result.recordsets[0][0]
                return {
                    exam_one: exam_one1,
                    exam_one_kg: exam_one_kg1,
                    exam_one_mark: exam_one_mark1,
                    exam_one_mark_kg: exam_one_mark_kg1,
                    exam_two: null,
                    exam_two_kg: null,
                    exam_two_mark: null,
                    exam_two_mark_kg: null,
                }
            } else {
                // const { p34: exam_one, p34_kg: exam_one_kg, ved2: exam_one_mark, p31k: exam_one_mark_kg } = result.recordsets[0][0]
                // const { p34: exam_two, p34_kg: exam_two_kg, ved2: exam_two_mark, p31k: exam_two_mark_kg } = result.recordsets[0][1]
                const [{ p34: exam_one2, p34_kg: exam_one_kg2, ved2: exam_one_mark2, p31k: exam_one_mark_kg2 },
                    { p34: exam_two2, p34_kg: exam_two_kg2, ved2: exam_two_mark2, p31k: exam_two_mark_kg2 }] = result.recordsets[0]
                return {
                    exam_one: exam_one2,
                    exam_one_kg: exam_one_kg2,
                    exam_one_mark: exam_one_mark2,
                    exam_one_mark_kg: exam_one_mark_kg2,
                    exam_two: exam_two2,
                    exam_two_kg: exam_two_kg2,
                    exam_two_mark: exam_two_mark2,
                    exam_two_mark_kg: exam_two_mark_kg2,
                }
            }
        } else {
            // // console.log('error, no data')
            return 500;
        }
    } catch (err) {
        // // console.log('error, no data', err)     
        return 500;
    }
}
async function getDisciplineList(id, gid) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('student_id', sql.Int, id)
            .input('group_id', sql.Int, gid)
            .query('exec SP_akadem_student_ozenka @st=@student_id, @gr=@group_id')
        // exec SP_akadem_student_ozenka @st= 35058, @gr=1601;
        // console.dir(result)
        if (result && result.recordsets && result.recordsets.length && result.recordsets[0] && result.recordsets[0].length) {
            // id_student, id_semester, p34, p34_kg, ved2, p31k
            result.recordsets[0].sort(function (a, b) {
                return (parseInt(a.num) > parseInt(b.num)) ? 1 : -1;
            });
            return result.recordsets[0]
        } else {
            // // console.log('error, no data')
            return 500;
        }

    } catch (err) {
        // // console.log('error, no data', err)     

        return 500;
    }
}
async function getStudentList(user, text) {
    try {
        // console.log('user,text, queary', user, text)
        const pool = await poolPromise
        const result = await pool.request()
            .input('text', sql.NVarChar, text)
            .input('user', sql.Int, user)
            .query('exec SP_akadem_student_search @fio=@text, @id_AVN_user=@user')
        // exec SP_akadem_student_search  @fio ='ов', @id_AVN_user= 
        // console.dir(result)
        if (result && result.recordsets && result.recordsets.length && result.recordsets[0] && result.recordsets[0].length) {
            //  
            // console.log(result.recordsets[0])
            return result.recordsets[0]
        } else {
            // // console.log('error, no data')

            return 500;
        }
    } catch (err) {
        // // console.log('error, no data', err)     

        return 500;
    }
}

module.exports = { getStudentCome, getStudentLeave, getStudentExam, getDisciplineList, getStudentList }