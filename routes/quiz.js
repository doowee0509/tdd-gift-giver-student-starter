const express = require("express")
const GiftExchange = require("../models/gift-exchange")
const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const result = await GiftExchange.quizResults(req.body.answers)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const quiz = await GiftExchange.quiz()
        res.status(200).json(quiz)
    } catch (err) {
        next(err)
    }
})



module.exports = router