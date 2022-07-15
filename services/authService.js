const { sql, poolPromise } = require('./db')
const { generateToken, checkJWT } = require('./tokenService')

async function login(username, password) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('pass', sql.NVarChar, password)
            .query(`exec SP_login_passwordReturnFullName @login=@username, @password=@pass, @prog='AVN BT'`)
        if (result && result.recordsets && result.recordsets.length && result.recordsets[0] && result.recordsets[0].length) {
            const id = result.recordsets[0][0].id_AVN_user || result.recordsets[0][0].id_AVN_User
            const name = `${result.recordsets[0][0].surname} ${result.recordsets[0][0].name}. ${result.recordsets[0][0].patronymic}.`
            const doljnost = result.recordsets[0][0].doljnost
            const AVN_BT_report = result.recordsets[0][0].AVN_BT_report
            const AVN20 = result.recordsets[0][0].AVN20
            const token = generateToken(id, name, doljnost, AVN_BT_report, AVN20)
            return { token, id, name, doljnost, AVN_BT_report, AVN20 }
        } else {
            return 400;
        }
    } catch (err) {
        console.log(err.message);
        return 500;
    }
}


module.exports = { login }