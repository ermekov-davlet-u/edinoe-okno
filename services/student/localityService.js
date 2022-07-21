const { poolPromise } = require("../db");


async function republic(){
    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`SELECT  id_republics as value, republic as label FROM [AVN].[dbo].[Republics]`);
        if (
            r &&
            r.recordset &&
            r.recordset.length 
        )
            return( r.recordset );
        else return [] ;
    } catch (err) {
        console.log("Republics error", err.message);
        return({ Republics: [] });
    }

}

async function oblast(id_republics){
    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`SELECT id_oblast as value, oblast as label FROM [AVN].[dbo].[Oblast] where id_republics=${id_republics}`);

        if (
            r &&
            r.recordset &&
            r.recordset.length )
            return(r.recordset );
        else return( [] );
    } catch (err) {
        console.log("oblast error", err.message);
        return({ OblastList: [] });
    }

}

async function raion(id_oblast){
    try {
        const pool = await poolPromise;
        let r = await pool
            .request()
            .query(`SELECT id_raion as value, raion as label FROM [AVN].[dbo].[Raion] where id_oblast=${id_oblast}`);

        if (
            r &&
            r.recordset &&
            r.recordset.length 
        )
            return( r.recordset );
        else return( [] );
    } catch (err) {
        console.log("RaionList error", err.message);
        return({ RaionList: [] });
    }
}

async function raionUpdate(id_oblast, id_raion, newRaion, newRaionKg){
    try {
        const pool = await poolPromise;
        let r = await pool.request().query(`
      UPDATE [AVN].[dbo].[Raion]
      SET [raion] = '${newRaion}'
         ,[raion_kg] = '${newRaionKg}'
    WHERE id_republics=1 and id_oblast=${id_oblast} and id_raion=${id_raion}`);

        if (r && r.rowsAffected && r.rowsAffected.length)
            return( r.rowsAffected[0]);
        else return( null );
    } catch (err) {
        console.log("raion-update error", err.message);
        return({ result: null });
    }
}

async function raionInsert(id_oblast, newRaion, newRaionKg){
    try {
        const pool = await poolPromise;
        let r = await pool.request().query(`
      INSERT INTO [AVN].[dbo].[Raion] (id_republics,id_oblast,raion,raion_kg)
       VALUES (1,${id_oblast}, '${newRaion}','${newRaionKg}')
  `);

        if (r && r.rowsAffected && r.rowsAffected.length)
            return(r.rowsAffected[0] );
        else return(null);
    } catch (err) {
        console.log("raion-insert error", err.message);
        return({ result: null });
    }
}

async function raionDelete(id_raion){
    try {
        const pool = await poolPromise;
        let r = await pool.request().query(`DELETE FROM [AVN].[dbo].[Raion] WHERE id_raion=${id_raion}`);

        if (r && r.rowsAffected && r.rowsAffected.length)
            return( r.rowsAffected[0] );
        else return( null );
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