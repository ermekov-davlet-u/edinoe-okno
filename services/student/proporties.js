var express = require("express");
var router = express.Router();
const { poolPromise } = require("../db");

router.post("/okno-properties", async function (req, res, next) {
    try {
        const { id_student } = req.body;
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`exec SP_Okno_student @id_student = ${id_student}`);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        )
            res.send({ Properties: r.recordset });
        else res.send({ Properties: [] });
    } catch (err) {
        console.log("Properties error", err.message);
        res.send({ Properties: [] });
    }

});

router.post("/access_to_proporties", async function (req, res, next) {
    try {
        const { SotrudnikStudent, id_AVN_User } = req.body;
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`exec SP_BT_access_fields @id_AVN_User=${id_AVN_User}, @SotrudnikStudent=${SotrudnikStudent}`);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        )
            res.send({ AccesToProporties: r.recordset });
        else res.send({ AccesToProporties: [] });
    } catch (err) {
        console.log("AccesToProporties error", err.message);
        res.send({ AccesToProporties: [] });
    }

});

router.post("/okno-role", async function (req, res, next) {
    try {
        const { id_AVN_User } = req.body;
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`SELECT [ckb]
        ,[dekanat]
        ,[KjMTB]
        ,[obshejitie]
        ,[biblioteka]
        ,[Buhgalteriy]
        ,[pole1]
        ,[pole2]
        ,[pole3] FROM [AVN].[dbo].[okno_role] where id_AVN_User=${id_AVN_User}`);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        )
            res.send({ OknoRole: r.recordset });
        else res.send({ Properties: [] });
    } catch (err) {
        console.log("OknoRole error", err.message);
        res.send({ OknoRole: [] });
    }

});

router.post("/properties-insert-update", async function (req, res, next) {
    try {
        const {
            id_student,
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
            AVN_user } = req.body;
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
            res.send({ result: r.recordsets });
        else res.send({ result: null });
    } catch (err) {
        console.log("directory_parent insert error", err.message);
        res.send({ result: null });
    }

});