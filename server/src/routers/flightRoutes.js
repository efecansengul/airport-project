const express = require("express");
const router = express.Router();
const { getFlights } = require("../controllers/flightController");

//get istegi ile ucus bilgilerini cek
router.get("/flights", getFlights);

module.exports = router;
