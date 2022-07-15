var express = require("express");
var router = express.Router();
const { poolPromise } = require("../db");


router.post("/republic", async function (req, res, next) {
    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`SELECT  * FROM [AVN].[dbo].[Republics]`);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        )
            res.send({ Republics: r.recordset });
        else res.send({ Republics: [] });
    } catch (err) {
        console.log("Republics error", err.message);
        res.send({ Republics: [] });
    }

});

router.post("/oblast", async function (req, res, next) {
    try {
        const pool = await poolPromise;
        const { id_republics } = req.body;
        let r = await pool
            .request()
            .query(`SELECT * FROM [AVN].[dbo].[Oblast] where id_republics=${id_republics}`);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        )
            res.send({ OblastList: r.recordset });
        else res.send({ OblastList: [] });
    } catch (err) {
        console.log("oblast error", err.message);
        res.send({ OblastList: [] });
    }

});

router.post("/raion", async function (req, res, next) {
    try {
        const { id_oblast } = req.body;
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`SELECT * FROM [AVN].[dbo].[Raion] where id_oblast=${id_oblast}`);

        if (
            r &&
            r.recordsets &&
            r.recordsets.length &&
            r.recordsets[0] &&
            r.recordsets[0].length
        )
            res.send({ RaionList: r.recordset });
        else res.send({ RaionList: [] });
    } catch (err) {
        console.log("RaionList error", err.message);
        res.send({ RaionList: [] });
    }
});

router.post("/raion-update", async function (req, res, next) {
    try {
        const { id_oblast, id_raion, newRaion, newRaionKg } = req.body;
        const pool = await poolPromise;
        let r = await pool.request().query(`
      UPDATE [AVN].[dbo].[Raion]
      SET [raion] = '${newRaion}'
         ,[raion_kg] = '${newRaionKg}'
    WHERE id_republics=1 and id_oblast=${id_oblast} and id_raion=${id_raion}`);

        if (r && r.rowsAffected && r.rowsAffected.length)
            res.send({ result: r.rowsAffected[0] });
        else res.send({ result: null });
    } catch (err) {
        console.log("raion-update error", err.message);
        res.send({ result: null });
    }
});

router.post("/raion-insert", async function (req, res, next) {
    try {
        const { id_oblast, newRaion, newRaionKg } = req.body;
        const pool = await poolPromise;
        let r = await pool.request().query(`
      INSERT INTO [AVN].[dbo].[Raion] (id_republics,id_oblast,raion,raion_kg)
       VALUES (1,${id_oblast}, '${newRaion}','${newRaionKg}')
  `);

        if (r && r.rowsAffected && r.rowsAffected.length)
            res.send({ result: r.rowsAffected[0] });
        else res.send({ result: null });
    } catch (err) {
        console.log("raion-insert error", err.message);
        res.send({ result: null });
    }
});

router.post("/raion-delete", async function (req, res, next) {
    try {
        const { id_raion } = req.body;
        const pool = await poolPromise;
        let r = await pool.request().query(`DELETE FROM [AVN].[dbo].[Raion] WHERE id_raion=${id_raion}`);

        if (r && r.rowsAffected && r.rowsAffected.length)
            res.send({ result: r.rowsAffected[0] });
        else res.send({ result: null });
    } catch (err) {
        console.log("raion delete error", err.message);
        res.send({ result: null });
    }
});