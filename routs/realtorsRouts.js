const express = require("express");
const router = express.Router();
const RealtorController = require("../controllers/RealtorController");

router.get("/realtor", RealtorController.getAll);
router.get("/realtor/:id", RealtorController.getSingle);
router.get("/realtor/thumbnail/:id", RealtorController.getThumbnail);
router.put("/realtor/:id", RealtorController.updateProfile);

module.exports = router;
