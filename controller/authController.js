
const { login } = require('../services/authService')
const { checkJWT } = require('../services/tokenService')

class AuthController {


    async logout(req, res) {

        res.cookie('tokenBT', 'tkn', { maxAge: 0, httpOnly: true });
        return res.json({ status: 200 })
    }

    async checkLogin(req, res) {
        const { data, message, error, status } = await checkJWT(req.cookies)
        return res.status(status).json({ status, message, error, data })
    }

    async postLogin(req, res) {
        const { username, password } = req.body;
        try {
            const result = await login(username, password);
            const tokenError = (result === 500) ? true : false
            const noUser = (result === 400) ? true : false
            
            if (!noUser) {
                if (!tokenError) {
                    res.cookie('tokenBT', result.token, { maxAge: 60 * 60 * 1000, httpOnly: true });
                    return res.send({ status: 200, message: 'Успешно!', error: false, data: { id: result.id, name: result.name, doljnost: result.doljnost, AVN_BT_report: result.AVN_BT_report, AVN20: result.AVN20 } })
                }
                res.cookie('tokenBT', "", { maxAge: 0, httpOnly: true });
                return res.json({ status: 500, message: 'Ошибка сервера!', error: true, data: false })
            } else {
                res.cookie('tokenBT', "", { maxAge: 0, httpOnly: true });
                return res.json({ status: 500, message: 'Неправильный логин или пароль!', error: true, data: false })
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }


}



module.exports = new AuthController()
