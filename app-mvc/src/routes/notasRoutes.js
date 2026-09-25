const express = require("express");
const controller = require("../controllers/notasController");

const router = express.Router();

router.get("/notas", controller.listar);
router.post("/notas", controller.criar);
router.delete("/notas/:id", controller.remover);
router.patch("/notas/:id/favorita", controller.favoritar);

module.exports = router;
