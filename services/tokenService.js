const jwt = require('jsonwebtoken');
require('dotenv').config()

// const accessTokenSecret = process.env.ACCESS_SECRET_TOKEN
const accessTokenSecret = 'aFDHjugem93381bgf4!@ED`~fwf4nfn310-kGcvkkkpd32Gf9jm4'

const checkJWT = async (cookies) => {
    const token = cookies[process.env.COOKIE_NAME];
    let response = { error: false, data: false }
    if (token) {
        jwt.verify(token, accessTokenSecret, (err, data) => {
            if (err) {
                // return res.sendStatus(403);
                response = { error: true, message: "Ошибка проверки токена!", data: false, status: 401 };
                return response;
            }
            response = { error: false, message: "Авторизован", data: data, status: 200 };
            console.log(111,response);
            
        });
    }
    else {
        response = { error: true, message: "Введите логин и пароль!", data: false, status: 401 };
        return response;
    }
    return response;
};  

const authenticateJWT = async (req, res, next) => {
    const token = req.cookies['tokenBT'];
    if (token) {
        jwt.verify(token, accessTokenSecret, (err, data) => {
            if (err) {
                // return res.sendStatus(403);
                return res.status(401).json({ status: 401, message: "Ошибка проверки токена!" })
            }
            if (req.query.id_avn_user != data.id) {
                // return res.sendStatus(403);
                return res.status(401).json({ status: 401, message: "Ошибка, пользователь не найден!" })
            }
            req.user = data.user;
            next();
        });
    }
    else { return res.status(401).json({ status: 401, message: "Ошибка, токен не найден!" }) }
};

const generateToken = (id, name, doljnost, AVN_BT_report, AVN20) => {
    return jwt.sign({ id, name, doljnost, AVN_BT_report, AVN20 }, accessTokenSecret, { expiresIn: '1h' });
}

module.exports = { authenticateJWT, generateToken, checkJWT }