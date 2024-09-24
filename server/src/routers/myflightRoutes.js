const router = require("express").Router();
const {
  postMyFlights,
  getMyFlights,
  deleteMyFlight,
} = require("../controllers/myflightController");

//post itegi ile ucus ekliyorum
router.post("/myflights", postMyFlights);
//get istegi ile tüm ucusları alıyorum
router.get("/myflights", getMyFlights);

//delete istegi ile id'ye göre silme islemi
router.delete("/myflights/:id", deleteMyFlight);
module.exports = router;
