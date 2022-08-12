
const dayjs = require('dayjs');
const academService = require('../services/report/academService')
const academUtils = require('../services/report/academUtils')
const { fullArray } = require('../services/utils')


class AcademController {
    async academ(req, res) {
        try {

            // console.time("all query time");
            const user = 152
            const { id = 23, gid = 22 } = req.query
            if (!id || !gid) return res.redirect('/')

            // console.time("getDisciplineList");
            const disciplines = await academService.getDisciplineList(id, gid);
            // console.timeEnd("getDisciplineList");
            const come = await academService.getStudentCome(id);
            const leave = await academService.getStudentLeave(id, gid);
            const exam = await academService.getStudentExam(id, gid);
            // console.timeEnd("all query time");

            const comeError = (come === 500) ? true : false
            const leaveError = (leave === 500) ? true : false
            const examError = (exam === 500) ? true : false
            const disciplineError = (disciplines === 500) ? true : false
            const printed = dayjs().format('DD.MM.YYYY')
            const data = { ...come, comeError, ...leave, leaveError, ...exam, examError, printed }


            let list48 = null
            let list87 = null
            // let list99 = null
            let list_kg48 = null
            let list_kg87 = null
            // let list_kg99 = null
            let list = null
            let list_kg = null

            let context = {
                data,
                user,
                title: data.name,
            }

            if (disciplineError) {
                console.log("page one, no discipline")
            }
            if (!disciplineError) {
                // console.log("no error")
                const ordered = academUtils.disciplineList(disciplines)
                list = ordered.list
                list_kg = ordered.list_kg

                if (Math.max(list.length, list_kg.length) < 39) {
                    list87 = fullArray(list, 39)
                    list_kg87 = fullArray(list_kg, 39)
                    context = {
                        ...context,
                        list87,
                        list_kg87,
                    }
                    console.log("page one, list 39")
                }
                else {
                    list48 = fullArray(list.slice(0, 48), 48)
                    list87 = fullArray(list.slice(48, 88), 39)
                    // list99 = list.slice(88)

                    list_kg48 = fullArray(list_kg.slice(0, 48), 48)
                    list_kg87 = fullArray(list_kg.slice(48, 88), 39)
                    // list_kg99 = list_kg.slice(88)
                    context = {
                        ...context,
                        list48,
                        list87,
                        // list99,
                        // list99str: JSON.stringify(list99),
                        list_kg48,
                        list_kg87,
                        // list_kg99,
                        // list_kg99str: JSON.stringify(list_kg99),
                    }
                    console.log("page two, list 87")
                    // console.log(context)
                }

            }

            return res.render('page', context)


        } catch (err) {
            console.log("academ error", err.message);
            return res.send(err.message)
        }
    }


}


module.exports = new AcademController()
