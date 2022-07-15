const { poolPromise } = require("../db");


async function getBase64Data(id_student, id_group){
    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`exec SP_uch_kard_obshee @id_group=${id_group}, @id_student=${id_student}`);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[1] 
        ) {
            let base64data = Buffer.from(r.recordsets[1][0].photo).toString('base64');
            return({ base64data });
        }
        else return({ base64data: [] });
    } catch (err) {
        console.log("base64data error", err.message);
        return({ base64data: [] });
    }

}

async function getOBJ(id_student, id_group){
    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`exec SP_uch_kard_obshee @id_group=${id_group}, @id_student=${id_student}`);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0]
        ) {
            return({ StudentInf: r.recordsets[0], Male: r.recordsets[1] });
        }
        else return({ StudentInf: [] });
    } catch (err) {
        console.log("StudentInf error", err.message);
        return({ StudentInf: [] });
    }
}

module.exports = {getBase64Data, getOBJ}