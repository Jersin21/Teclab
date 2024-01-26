const { register, login, getMe, getResponsable } = require("../controllers/userController");
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
const { checkAuth,checkPermission} = require("../middleware/authMiddleware");
const { createClinica } = require("../controllers/clinicaController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);


router.get("/analisys",checkAuth,checkPermission([1,5,6,7]), solicitudes);
router.get("/categorias/:id",checkAuth,checkPermission([1,5,6,7]), getAnalisys);
router.put("/categorias/:id",checkAuth,checkPermission([1,5,6,7]), subirResultado);
router.get("/analisys/:id",checkAuth,checkPermission([1,5,6,7]), solicitud);
router.put("/analisys/:id",checkAuth,checkPermission([1,5,6,7]), updateAnalisys);
router.post("/analisys",checkAuth,checkPermission([1,5,6,7]), registerAnalisys);
router.delete("/analisys/:id",checkAuth,checkPermission([1,5,6,7]), deleteAnalisys);
router.get("/tipoanalisys",checkAuth,checkPermission([1,5,6,7]), TipoAnalisis);

router.get("/recepcionista",checkAuth,checkPermission([1,5,6,7]), getSolicitudRecepcionista);
router.put("/recepcionista/:id",checkAuth,checkPermission([1,5,6,7]), asignarResponsable)

router.get("/responsable",checkAuth,checkPermission([1,5,6,7]), getSolicitudResponsable);
/* router.get("/responsable/:id",checkAuth,checkPermission([1,5,6,7]),subirResultado );
 */
router.get("/medicos",checkAuth,checkPermission([1,5,6,7]), getResponsable);

router.post("/registerCenter",checkAuth,checkPermission([1,5,6,7]),createClinica)

router.get("/me", checkAuth, getMe)

module.exports = router;
