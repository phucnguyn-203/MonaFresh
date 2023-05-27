const express = require("express");
const router = express.Router();

const {
    getAllInvoice,
    getOneInvoice,
    createImportInvoice,
    createExportInvoice,
    updateInvoice,
} = require("../controllers/invoiceControllers");

router.get("/", getAllInvoice);
// router.get("/:id", getOneInvoice);
router.patch("/:id", updateInvoice);
router.post("/in", createImportInvoice);
router.post("/out", createExportInvoice);
module.exports = router;
