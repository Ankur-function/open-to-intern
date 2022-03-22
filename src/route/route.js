const express = require("express");
const router = express.Router();

const CollegeController = require("../Controllers/CollegeController")
const InternController = require("../Controllers/InternController")



router.post("/college",CollegeController.createcollege)
router.post("/intern",InternController.createintern)
router.get("/details",InternController.getinterndetails)


module.exports = router;