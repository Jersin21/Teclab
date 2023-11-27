const { register, login } = require("../controllers/userController");
const {
  updateAnalisys,
  solicitud,
  solicitudes,
  registerAnalisys,
  deleteAnalisys,
  getSolicitudRecepcionista,
  getSolicitudResponsable,
  asignarResponsable,
  subirResultado,
  getAnalisys,
} = require("../controllers/analisysController");
const { TipoAnalisis } = require("../controllers/tipoanalisysController");
const { getMedicos } = require("../controllers/medicosController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/analisys", solicitudes);
router.get("/categorias/:id", getAnalisys);
router.get("/analisys/:id", solicitud);
router.put("/analisys/:id", updateAnalisys);
router.post("/analisys", registerAnalisys);
router.delete("/analisys/:id", deleteAnalisys);
router.get("/tipoanalisys", TipoAnalisis);

router.get("/recepcionista", getSolicitudRecepcionista);
router.put("/recepcionista/:id", asignarResponsable)

router.get("/responsable", getSolicitudResponsable);
router.get("/responsable/:id",subirResultado );

router.get("/medicos", getMedicos);

module.exports = router;
