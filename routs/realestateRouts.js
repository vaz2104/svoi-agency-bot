const express = require("express");
const router = express.Router();
const RealestateController = require("../controllers/RealestateController");

router.post("/realestate", RealestateController.create);
router.get("/realestate", RealestateController.getAll);
router.delete("/realestate/:id", RealestateController.delete);
router.get("/realestate/:id", RealestateController.getSingle);
router.put("/realestate/:id", RealestateController.update);

module.exports = router;
