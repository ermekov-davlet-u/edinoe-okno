
const selectService = require('../services/selectService')

class SelectController {
    async eduform(req, res) {
        try {
            const { data, error } = await selectService.educFEduc()
            return res.json({ data, error })
        } catch (err) {
            console.log("eduform error", err.message);
            return res.json({ data: [], error: err.message });
        }
    }

    async eduFaculty(req, res) {
        try {
            const { data, error } = await selectService.educFaculty()
            return res.json({ data, error })
        } catch (err) {
            console.log("eduform error", err.message);
            return res.json({ data: [], error: err.message });
        }
    }

    async eduRate(req, res) {
        try {
            const { data, error } = await selectService.educRate()
            return res.json({ data, error })
        } catch (err) {
            console.log("eduform error", err.message);
            return res.json({ data: [], error: err.message });
        }
    }

    async eduGroup(req, res) {
        try {
            const {id_year,id_faculty,id_f_educ,id_rate} = req.body;
            const { data, error } = await selectService.educGroup(id_year,id_faculty,id_f_educ,id_rate)
            return res.json({ data, error })
        } catch (err) {
            console.log("eduform error", err.message);
            return res.json({ data: [], error: err.message });
        }
    }



}


module.exports = new SelectController()
