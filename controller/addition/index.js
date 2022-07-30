const router = require("express").Router()
const additionService = require("../../services/addition/index.js")

router.get("/okno", async(req, res) => {
    try {
        const result = await additionService.getOkno() 
        res.send(result);
      } catch (err) {
        console.log("Okno_dopolnitelno error", err.message);
        res.send({ Okno_dopolnitelno: [] });
      }
})


router.put("/okno", async function (req, res, next) {
    try {
        const { insert_pole, insert_pole_kg, id_okno_dopolnitelno } = req.body;
        const result = await additionService.setOkno(insert_pole, insert_pole_kg, id_okno_dopolnitelno) 
        res.send(result);
    } catch (err) {
        console.log("Okno_dopolnitelno update error", err.message);
        res.send({ result: null });
    }
});
  
router.get("/special", async function (req, res, next) {
    try {
        const { search_special, pageNum } = req.query;
        const result = await additionService.getSpecial(search_special, pageNum) 
        res.send(result);
    } catch (err) {
        console.log("SpecialList error", err.message);
        res.send({ SpecialList: [] });
    }
});
  
router.put("/special", async function (req, res, next) {
    try {
        const { id_AVN_User, setAcademKG, setAcademEN, id_special } = req.body;
        const result = await additionService.setSpecial(id_AVN_User, setAcademKG, setAcademEN, id_special) 
        res.send(result);
    } catch (err) {
        console.log("special update error", err.message);
        res.send({ result: null });
    }
});
  
  
router.get("/direction", async function (req, res, next) {
    try {
        const { search_direction, pageNum } = req.query;
        const result = await additionService.getDirection(search_direction, pageNum) 
        res.send(result);
    } catch (err) {
        console.log("DirectionList error", err.message);
        res.send({ DirectionList: [] });
    }
});
  
router.put("/direction", async function (req, res, next) {
    try {
        const { id_AVN_User, setAcademKG, setAcademEN, id_direction } = req.body;
        const result = await additionService.setDirection(id_AVN_User, setAcademKG, setAcademEN, id_direction) 
        res.send(result);
    } catch (err) {
        console.log("direction update error", err.message);
        res.send({ result: null });
    }
});
  
  
  
router.get("/discipline", async function (req, res, next) {
    try {
        const { search_discipline, pageNum } = req.query;
        const result = await additionService.getDiscipline(search_discipline, pageNum)  
        res.send(result);
    } catch (err) {
        console.log("DisciplineList error", err.message);
        res.send({ DisciplineList: [] });
    }
});
  
router.put("/discipline", async function (req, res, next) {
    try {
        const { id_AVN_User, setAcademKG, setAcademEN, id_discipline } = req.body;
        const result = await additionService.setDiscipline(id_AVN_User, setAcademKG, setAcademEN, id_discipline) 
        res.send(result);
        
    } catch (err) {
        console.log("discipline update error", err.message);
        res.send({ result: null });
    }
});

module.exports = router