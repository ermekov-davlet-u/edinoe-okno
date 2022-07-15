const personalService = require("../services/student/personalService")

class PersonalController{
    async getBase64Data(req, res){
        try {
            const { id_student, id_group } = req.body;
            const result = personalService.getBase64Data(id_student, id_group)
            res.send(result)
        } catch (error) {
            console.log(error.message);
        }
    }
    async getOBJ(req, res){
        try {
            const { id_student, id_group } = req.body;
            const result = personalService.getOBJ(id_student, id_group)
            res.send(result)
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = new PersonalController()