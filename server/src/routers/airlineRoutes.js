const express = require("express");
const router = express.Router();
const { getAirlines } = require("../controllers/airlineController");

//get istegi ile ucus bilgilerini cek
router.get("/airlines", getAirlines);

module.exports = router;
