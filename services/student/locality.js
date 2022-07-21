const { poolPromise } = require("../db");


async function republic(){
    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`SELECT  * FROM [AVN].[dbo].[Republics]`);
        if (
            r &&
            r.recordset &&
            r.recordset.length 
        )
            return({ Republics: r.recordset });
        else return({ Republics: [] });
    } catch (err) {
        console.log("Republics error", err.message);
        return({ Republics: [] });
    }

}

async function oblast(){
    try {
        const pool = await poolPromise;
        const { id_republics } = req.body;
        let r = await pool
            .request()
            .query(`SELECT * FROM [AVN].[dbo].[Oblast] where id_republics=${id_republics}`);
        if (
            r &&
            r.recordset &&
            r.recordset.length
        )
            return({ OblastList: r.recordset });
        else return({ OblastList: [] });
    } catch (err) {
        console.log("oblast error", err.message);
        return({ OblastList: [] });
    }

}

async function raion(){
    try {
        const { id_oblast } = req.body;
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`SELECT * FROM [AVN].[dbo].[Raion] where id_oblast=${id_oblast}`);

        if (
            r &&
            r.recordset &&
            r.recordset.length 
        )
            return({ RaionList: r.recordset });
        else return({ RaionList: [] });
    } catch (err) {
        console.log("RaionList error", err.message);
        return({ RaionList: [] });
    }
}

async function raionUpdate(){
    try {
        const { id_oblast, id_raion, newRaion, newRaionKg } = req.body;
        const pool = await poolPromise;
        let r = await pool.request().query(`
        UPDATE [AVN].[dbo].[Raion]
        SET [raion] = '${newRaion}'
            ,[raion_kg] = '${newRaionKg}'
        WHERE id_republics=1 and id_oblast=${id_oblast} and id_raion=${id_raion}`);

        if (r && r.rowsAffected && r.rowsAffected.length)
            return({ result: r.rowsAffected[0] });
        else return({ result: null });
    } catch (err) {
        console.log("raion-update error", err.message);
        return({ result: null });
    }
}

async function raionInsert(){
    try {
        const { id_oblast, newRaion, newRaionKg } = req.body;
        const pool = await poolPromise;
        let r = await pool.request().query(`
        INSERT INTO [AVN].[dbo].[Raion] (id_republics,id_oblast,raion,raion_kg)
        VALUES (1,${id_oblast}, '${newRaion}','${newRaionKg}')
  `);

        if (r && r.rowsAffected && r.rowsAffected.length)
            return({ result: r.rowsAffected[0] });
        else return({ result: null });
    } catch (err) {
        console.log("raion-insert error", err.message);
        return({ result: null });
    }
}

async function raionDelete(){
    try {
        const { id_raion } = req.body;
        const pool = await poolPromise;
        let r = await pool.request().query(`DELETE FROM [AVN].[dbo].[Raion] WHERE id_raion=${id_raion}`);

        if (r && r.rowsAffected && r.rowsAffected.length)
            return({ result: r.rowsAffected[0] });
        else return({ result: null });
    } catch (err) {
        console.log("raion delete error", err.message);
        return({ result: null });
    }
}

module.exports = {
    republic,
    oblast,
    raion,
    raionUpdate,
    raionInsert,
    raionDelete
}