const discriptionService = require("../services/student/descriptionService")

class DiscriptionController {

    async delDiscription(req, res){
        try {
            const {id_okno_description} = req.body
            const result = await discriptionService.descriptionDelete(id_okno_description)
            res.send( { error: false, data: result } )
        } catch (error) {
            console.log(error.message);
            res.send({ error: error.message, data: [] })
        }
    }
    async insDiscription(req, res){
        try {
            const { id_student, id_user, okno_description } = req.body
            const result = await discriptionService.descriptionInsert(id_student, id_user, okno_description)
            res.send( { error: false, data: result } )
        } catch (error) {
            console.log(error.message);
            res.send({ error: error.message, data: [] })
        }
    }
    async updDiscription(req, res){
        try {
            const { id_student, okno_description, id_okno_description } = req.body
            const result = await discriptionService.descriptionUpdate(id_student, okno_description, id_okno_description)
            res.send( { error: false, data: result } )
        } catch (error) {
            console.log(error.message);
            res.send({ error: error.message, data: [] })
        }
    }
    async oknoDiscription(req, res){
        try {
            const { id_student } = req.body
            const result = await discriptionService.descriptionOkno(id_student)
            res.send( { error: false, data: result } )
        } catch (error) {
            console.log(error.message);
            res.send({ error: error.message, data: [] })
        }
    }


}

module.exports = new DiscriptionController()