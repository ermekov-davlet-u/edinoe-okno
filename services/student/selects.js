var express = require("express");
var router = express.Router();
const { poolPromise } = require("../db");


router.post("/faculty", async function (req, res, next) {
    try {
        const { id_AVN_User } = req.body;
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`exec SP_BT_faculty_select @id_login=${id_AVN_User}`);
        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        )
            res.send({ Faculty: r.recordsets });
        else res.send({ Faculty: [] });
    } catch (err) {
        console.log("faculty error", err.message);
        res.send({ Faculty: [] });
    }
});
router.post("/f-educ", async function (req, res, next) {
    try {
        const { id_AVN_User } = req.body;
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`exec SP_BT_f_educ_select @id_login=${id_AVN_User}`);
        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        )
            res.send({ EducList: r.recordset });
        else res.send({ EducList: [] });
    } catch (err) {
        console.log("f-educ error", err.message);
        res.send({ EducList: [] });
    }

});
router.get("/rate", async function (req, res, next) {
    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`SELECT  id_rate, p22 FROM  dbo.rate`);
        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        )
            res.send({ Rate: r.recordsets });
        else res.send({ Rate: [] });
    } catch (err) {
        console.log("Rate error", err.message);
        res.send({ Rate: [] });
    }
});
router.post("/group", async function (req, res, next) {
    try {
        const { id_year, id_faculty, id_f_educ, id_rate } = req.body;
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`exec SP_BT_group_select 
            @id_a_year =${id_year},
            @id_faculty =${id_faculty},
            @id_f_educ =${id_f_educ},
            @id_rate =${id_rate}`);
        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        )
            res.send({ Group: r.recordset });
        else res.send({ Group: [] });
    } catch (err) {
        console.log("Group error", err.message);
        res.send({ Group: [] });
    }

});