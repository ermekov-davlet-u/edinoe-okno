var express = require("express");
var router = express.Router();
const { poolPromise } = require("../db");


router.post("/base64data", async function (req, res, next) {
    try {
        const { id_student, id_group } = req.body;
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`exec SP_uch_kard_obshee @id_group=${id_group}, @id_student=${id_student}`);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[1] &&
            r.recordsets[1].length
        ) {
            let base64data = Buffer.from(r.recordsets[1][0].photo).toString('base64');
            res.send({ base64data });
        }
        else res.send({ base64data: [] });
    } catch (err) {
        console.log("base64data error", err.message);
        res.send({ base64data: [] });
    }

});

router.post("/obj", async function (req, res, next) {
    try {
        const { id_student, id_group } = req.body;
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`exec SP_uch_kard_obshee @id_group=${id_group}, @id_student=${id_student}`);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        ) {
            res.send({ StudentInf: r.recordsets[0], Male: r.recordsets[1] });
        }
        else res.send({ StudentInf: [] });
    } catch (err) {
        console.log("StudentInf error", err.message);
        res.send({ StudentInf: [] });
    }
});