const express = require("express");
const router = express.Router();

const { getRecords, getScore } = require("../controllers/homeRoute");

router.post("/game", getRecords);
router.get("/gamescore", getScore);

module.exports = router;
