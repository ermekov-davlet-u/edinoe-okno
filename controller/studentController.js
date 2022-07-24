const student = require("../services/student/students.js")

class StudentController{
    async getStudentByGroup(req, res){
        try {
            const { id_a_year, id_f_educ, id_faculty, id_rate, id_group } = req.body
            const result = await student.getStudList( id_a_year, id_f_educ, id_faculty, id_rate, id_group )
            res.send( { error: false, data: result } ) 
        } catch (error) {
            console.log(error.message);
            res.send({ error: error.message, date: [] })
        }
    }

    async getStudentByName(req, res){
        try {
            const { SearchNameSt } = req.body
            console.log(SearchNameSt);
            const result = await student.getStudent( SearchNameSt )
            res.send( { error: false, data: result } ) 
        } catch (error) {
            console.log(error.message);
            res.send({ error: error.message, date: [] })
        }
    }
}

module.exports = new StudentController()