const { sql, poolPromise } = require('../db')

async function getOknoProperties( id_student ){
    try {
        const pool = await poolPromise;
        const r = await pool.request().query(`exec SP_Okno_student @id_student = ${ id_student }`)
        if (
            r &&
            r.recordset &&
            r.recordset.length
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

   async function setAccessProperty(id_student,
    id_group,
    ckb,
    dekanat,
    KjMTB,
    obshejitie,
    biblioteka,
    Buhgalteriy,
    pole1,
    pole2,
    pole3,
    AVN_user){
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
            r.recordsets[0] &&
            r.recordsets[0].length)
            return({ result: r.recordsets });
            else return({ result: null });
        } catch (err) {
            console.log("directory_parent insert error", err.message);
            return({ result: null });
        }
    
    }
   

    async function accessProperties(SotrudnikStudent, id_AVN_User){
        try { 
            const pool = await poolPromise;
            console.log(SotrudnikStudent, id_AVN_User);
            let r = await pool
                .request()
                .query(`exec SP_BT_access_fields @id_AVN_User = 5090, @SotrudnikStudent = ${SotrudnikStudent}`);

            if (
                r &&
                r.recordset &&
                r.recordset.length 
            )   return({ AccesToProporties: r.recordset });
            else return({ AccesToProporties: [
                { pole: "ckb",visibles : true },
                { pole: "dekanat",visibles : true },
                { pole: "KjMTB",visibles : true },
                { pole: "obshejitie",visibles : true },
                { pole: "biblioteka",visibles : false },
                { pole: "Buhgalteriy",visibles : false },
                { pole: "pole1",visibles : true },
                { pole: "pole2",visibles : false },
                { pole: "pole3",visibles : false }  
            ] });
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
                    r.recordset &&
                    r.recordset.length
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

                console.log(id_student,
                    id_group,
                    ckb,
                    dekanat,
                    KjMTB,
                    obshejitie,
                    biblioteka,
                    Buhgalteriy,
                    pole1,
                    pole2,
                    pole3);

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
               ,@AVN_user ='${5090}'`);
        
                if (r &&
                    r.recordset &&
                    r.recordset.length &&
                    r.recordset[0] )return({ result: r.recordset });
                else return({ result: null });
                
            } catch (err) {
                console.log("directory_parent insert error", err.message);
                return({ result: null });
            }
        
    }


module.exports = { getOknoProperties, accessProperties, oknoRole, propertiesIU, getPaymentStudent }