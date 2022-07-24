var express = require("express");
var router = express.Router();
const { 
    republic,
    oblast,
    raion,
    raionUpdate,
    raionInsert,
    raionDelete
 } = require("../../services/student/localityService")

router.get("/republic", async function (req, res, next) {
    try {
        let r = await republic()
        res.send({ Republics: r });
    } catch (err) {
        console.log("Republics error", err.message);
        res.send({ Republics: [] });
    }

});

router.get("/oblast", async function (req, res, next) {
    try {
        const { id_republics } = req.query;
        let r = await oblast(id_republics)
        res.send({ OblastList: r });
    } catch (err) {
        console.log("oblast error", err.message);
        res.send({ OblastList: [] });
    }

});

router.get("/raion", async function (req, res, next) {
    try {
        const { id_oblast } = req.query;
        let r = await raion(id_oblast)
        res.send({ RaionList: r });
    } catch (err) {
        console.log("RaionList error", err.message);
        res.send({ RaionList: [] });
    }
});

router.put("/raion", async function (req, res, next) {
    try {
        const { id_oblast, id_raion, newRaion, newRaionKg } = req.body;
        let r = await raionUpdate(id_oblast, id_raion, newRaion, newRaionKg)
        res.send({ result: r });
    } catch (err) {
        console.log("raion-update error", err.message);
        res.send({ result: null });
    }
});

router.post("/raion", async function (req, res, next) {
    try {
        const { id_oblast, newRaion, newRaionKg } = req.body;
        let r = await raionInsert(id_oblast, newRaion, newRaionKg)
        res.send({ result: r });
    } catch (err) {
        console.log("raion-insert error", err.message);
        res.send({ result: null });
    }
});

router.delete("/raion", async function (req, res, next) {
    try {
        const { id_raion } = req.body;
        let r = await raionDelete(id_raion)
        res.send({ result: r });
    } catch (err) {
        console.log("raion delete error", err.message);
        res.send({ result: null });
    }
});

module.exports = router