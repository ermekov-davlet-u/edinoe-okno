const oknoProperties = require("../services/student/propertyService")

class OknoProperties {
    async getOknoProperties(req, res){
        try {
            const result = await oknoProperties.getOknoProperties()
            res.send(result)
        } catch (error) {
            console.log(error.message);
        }
    }

    async getAccessProperties(req, res){
        try {
            const result = await oknoProperties.accessProperties(req.body.SotrudnikStudent)
            res.send(result)
        } catch (error) {
            console.log(error.message);
        }
    }

    async getOknoRole(req, res){
        try {
            const result = await oknoProperties.oknoRole()
            res.send(result)
        } catch (error) {
            console.log(error.message);
        }
    }

    async getPropertiesIU(req, res){
        try {
            const { id_student,
                id_group,
                ckb,
                dekanat,
                KjMTB,
                obshejitie,
                biblioteka,
                Buhgalteriy,
                pole1,
                pole2,
                pole3 } = req.body
            const result = await oknoProperties.propertiesIU(id_student,
                id_group,
                ckb,
                dekanat,
                KjMTB,
                obshejitie,
                biblioteka,
                Buhgalteriy,
                pole1,
                pole2,
                pole3)
            res.send(result)
        } catch (error) {
            console.log(error.message);
        }
    }

}

module.exports = new OknoProperties()