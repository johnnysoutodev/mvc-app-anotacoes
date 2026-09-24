const express = require("express");
const controller = require("../controllers/notasController");

const router = express.Router();

router.get("/notas", controller.listar);
router.post("/notas", controller.criar);
router.delete("/notas/:id", controller.remover);

module.exports = router;
