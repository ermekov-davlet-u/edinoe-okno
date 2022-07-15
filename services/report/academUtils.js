const { wordSplit } = require('../utils')
const LENGTH = 70

const currentElement = (el, order, list) => {
    if (!el.discipline || el.discipline.length <= LENGTH) {
        list.push({
            order,
            discipline: el.discipline,
            chas: el.chas,
            kredits: el.kredits,
            ozenka: el.ozenka,
        })
    }
    else if (LENGTH < el.discipline.length <= LENGTH * 2) {
        let row = wordSplit(el.discipline, index = "all", firstLen = LENGTH, defaultLen = LENGTH)
        list.push(
            {
                order,
                discipline: row[0],
            },
            {
                discipline: row[1],
                chas: el.chas,
                kredits: el.kredits,
                ozenka: el.ozenka,
            }
        )
    }
    else if (LENGTH * 2 < el.discipline.length <= LENGTH * 3) {
        let row = wordSplit(el.discipline, index = "all", firstLen = LENGTH, defaultLen = LENGTH)

        list.push(
            {
                order,
                discipline: row[0],
            },
            {
                discipline: row[1],
            },
            {
                discipline: row[2],
                chas: el.chas,
                kredits: el.kredits,
                ozenka: el.ozenka,
            }
        )
    }
    else if (LENGTH * 3 < el.discipline.length <= LENGTH * 4) {
        let row = wordSplit(el.discipline, index = "all", firstLen = LENGTH, defaultLen = LENGTH)

        list.push(
            {
                order,
                discipline: row[0],
            },
            {
                discipline: row[1],
            },
            {
                discipline: row[2],
            },
            {
                discipline: row[3],
                chas: el.chas,
                kredits: el.kredits,
                ozenka: el.ozenka,
            }
        )
    }
    return list
}


const currentKgElement = (el, order, list_kg) => {
    if (!el.discipline_kg || el.discipline_kg.length <= LENGTH) {
        list_kg.push({
            order,
            discipline: el.discipline_kg,
            chas: el.chas,
            kredits: el.kredits,
            ozenka: el.ozenka_kg,
        })
    }
    else if (LENGTH < el.discipline_kg.length <= LENGTH * 2) {
        let row = wordSplit(el.discipline_kg, index = "all", firstLen = LENGTH, defaultLen = LENGTH)
        list_kg.push(
            {
                order,
                discipline: row[0],
            },
            {
                discipline: row[1],
                chas: el.chas,
                kredits: el.kredits,
                ozenka: el.ozenka_kg,
            }
        )
    }
    else if (LENGTH * 2 < el.discipline_kg.length <= LENGTH * 3) {
        let row = wordSplit(el.discipline_kg, index = "all", firstLen = LENGTH, defaultLen = LENGTH)

        list_kg.push(
            {
                order,
                discipline: row[0],
            },
            {
                discipline: row[1],
            },
            {
                discipline: row[2],
                chas: el.chas,
                kredits: el.kredits,
                ozenka: el.ozenka_kg,
            }
        )
    }
    else if (LENGTH * 3 < el.discipline_kg.length <= LENGTH * 4) {
        let row = wordSplit(el.discipline_kg, index = "all", firstLen = LENGTH, defaultLen = LENGTH)

        list_kg.push(
            {
                order,
                discipline: row[0],
            },
            {
                discipline: row[1],
            },
            {
                discipline: row[2],
            },
            {
                discipline: row[3],
                chas: el.chas,
                kredits: el.kredits,
                ozenka: el.ozenka_kg,
            }
        )
    }
    return list_kg
}


const disciplineList = (discipline) => {
    let semester = 0
    let list = []   // russian list
    let list_kg = []   // kyrgyz list
    // num, id_semester, semester, id_discipline, discipline_kg, discipline, discipline_num, discipline_kg_num, chas, kredits, ozenka, ozenka_kg
    for (i = 0; i < discipline.length; i++) {

        // if new semester => add semester line
        if (semester !== discipline[i].id_semester) {
            semester = discipline[i].id_semester
            list.push({ isSemester: true, semester: discipline[i].id_semester + "-семестр" })
            list_kg.push({ isSemester: true, semester: discipline[i].id_semester + "-семестр" })
        }
        currentElement(discipline[i], i + 1, list)
        currentKgElement(discipline[i], i + 1, list_kg)
    }
    console.log("discipline, list_kg, list = ", discipline.length, list_kg.length, list.length)
    return { list, list_kg }
}

module.exports = { disciplineList } 