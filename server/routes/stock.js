const express = require("express");
const router = express.Router();
const stockController = require("../controller/stock.js");
router.get("/", stockController.get);
// router.get("/:type", stockController.getStockBySheet);
// router.get("/:storage", stockController.getStorageByStorage);

router.post("/in", stockController.postIn);
router.post("/out", stockController.postOut);
router.post("/move", stockController.postMove);

// router.delete("/", stockController.delete);
// router.delete("/:id", stockController.deleteStockById);

module.exports = router;
