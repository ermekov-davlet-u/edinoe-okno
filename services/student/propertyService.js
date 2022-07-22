const { sql, poolPromise } = require('../db')

async function getOknoProperties( id_student ){
    try {
        const pool = await poolPromise;
        const r = await pool.request().query(`exec SP_Okno_student @id_student = ${ id_student }`)
        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0]
        )return({ Properties: r.recordset });
        else return({ Properties: [] });
    } catch (error) {
        console.log(error.message);
        return { error: true, message: error.message }
    }
}
async function getPaymentStudent(id_student) {
    try {
        const pool = await poolPromise;
        let r = await pool
        .request()
        .query(`
        exec SP_uch_kart_o  @st= ${id_student}`);
        if (
        r &&
        r.recordsets &&
        r.recordsets[0]
        )
        {
            return({ PAYMENT: r.recordset });
        }
        else return({ PAYMENT: [] });
    } catch (err) {
        console.log("PAYMENT error", err.message);
        return({ PAYMENT: [] });
    }
      
}
    async function      accessProperties(SotrudnikStudent, id_AVN_User){
        try { 
            const pool = await poolPromise;
            console.log(SotrudnikStudent, id_AVN_User);
            let r = await pool
                .request()
                .query(`exec SP_BT_access_fields @id_AVN_User = 5090, @SotrudnikStudent=${SotrudnikStudent}`);

            if (
                r &&
                r.recordset &&
                r.recordset.length 
            )   return({ AccesToProporties: r.recordset });
            else return({ AccesToProporties: [] });
        } catch (err) {
            console.log("AccesToProporties error", err.message);
            return({ AccesToProporties: [] });
        }
    }

    async function oknoRole(){
            try {
                const pool = await poolPromise;
                let r = await pool
                    .request()
                    .query(`SELECT id_a_year as value, p32 as label
                    FROM a_year`);
                if (
                    r &&
                    r.recordsets &&
                    r.recordsets.length &&
                    r.recordsets[0]
                )   return({ OknoRole: r.recordset });
                    else return({ Properties: [] });
            } catch (err) {
                console.log("OknoRole error", err.message);
                return({ OknoRole: [] });
            }
        
    }

    async function propertiesIU(id_student,
        id_group,
        ckb,
        dekanat,
        KjMTB,
        obshejitie,
        biblioteka,
        Buhgalteriy,
        pole1,
        pole2,
        pole3){
            try {
                const pool = await poolPromise;
                let r = await pool
                    .request()
                    .query(`exec SP_Okno_insert_update
                @id_student =${id_student}
               ,@id_group =${id_group}
               ,@ckb =${ckb}
               ,@dekanat =${dekanat}
               ,@KjMTB =${KjMTB}
               ,@obshejitie =${obshejitie}
               ,@biblioteka =${biblioteka}
               ,@Buhgalteriy =${Buhgalteriy}
               ,@pole1 =${pole1}
               ,@pole2 =${pole2}
               ,@pole3 =${pole3}
               ,@AVN_user ='${AVN_user}'`);
        
                if (r &&
                    r.recordsets &&
                    r.recordsets.length &&
                    r.recordsets[0] )return({ result: r.recordsets });
                else return({ result: null });
                
            } catch (err) {
                console.log("directory_parent insert error", err.message);
                return({ result: null });
            }
        
    }


module.exports = { getOknoProperties, accessProperties, oknoRole, propertiesIU, getPaymentStudent }