const personalService = require("../services/student/personalService")

class PersonalController{
    async getBase64Data(req, res){
        try {
            const { id_student, id_group } = req.body;
            const result = await personalService.getBase64Data(id_student, id_group)
            res.send(result)
        } catch (error) {
            console.log(error.message);
        }
    }
    async getOBJ(req, res){
        try {
            const { id_student, id_group } = req.query;
            const result = await personalService.getOBJ(id_student, id_group)
            res.send(result)
        } catch (error) {
            console.log(error.message);
            res.send({
                error: error.message,
                data: []
            })
        }
    }
}

module.exports = new PersonalController()