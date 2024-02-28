const { register, login, getMe, getResponsable } = require("../controllers/userController");
const multer = require("multer")
const path = require('path');
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
  getAnalisysVer,
} = require("../controllers/analisysController");
const { TipoAnalisis } = require("../controllers/tipoanalisysController");
const { getMedicos, createMedico,updateMedico, getMedico, deleteMedico } = require("../controllers/medicosController");
const { checkAuth,checkPermission} = require("../middleware/authMiddleware");
const { createClinica } = require("../controllers/clinicaController");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images')); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", register);
router.post("/login", login);


router.get("/analisys",checkAuth,checkPermission([1,2,5,6,7]), solicitudes);
router.get("/categorias/:id",checkAuth,checkPermission([1,2,5,6,7]), getAnalisys);
router.get("/analisysVer/:id",checkAuth,checkPermission([1,2,5,6,7]), getAnalisysVer);
router.put("/categorias/:id",checkAuth,checkPermission([1,2,5,6,7]),upload.any(), subirResultado);
router.get("/analisys/:id",checkAuth,checkPermission([1,2,5,6,7]), solicitud);
router.put("/analisys/:id",checkAuth,checkPermission([1,2,5,6,7]), updateAnalisys);
router.post("/analisys",checkAuth,checkPermission([1,2,5,6,7]), registerAnalisys);
router.delete("/analisys/:id",checkAuth,checkPermission([1,2,5,6,7]), deleteAnalisys);
router.get("/tipoanalisys",checkAuth,checkPermission([1,2,5,6,7]), TipoAnalisis);

router.get("/recepcionista",checkAuth,checkPermission([1,2,5,6,7]), getSolicitudRecepcionista);
router.put("/recepcionista/:id",checkAuth,checkPermission([1,2,5,6,7]), asignarResponsable)

router.get("/responsable",checkAuth,checkPermission([1,2,5,6,7]), getSolicitudResponsable);

router.get("/medicos",checkAuth,checkPermission([1,2,5,6,7]), getResponsable);
router.get("/getmedicos",checkAuth,checkPermission([1,2,5,6,7]), getMedicos);
router.post("/medicos",checkAuth,checkPermission([1,2,5,6,7]), createMedico)
router.get("/medicos/:id",checkAuth,checkPermission([1,2,5,6,7]), getMedico)
router.put("/medicos/:id",checkAuth,checkPermission([1,2,5,6,7]), updateMedico)
router.delete("/medicos/:id",checkAuth,checkPermission([1,2,5,6,7]), deleteMedico)

router.post("/registerCenter",checkAuth,checkPermission([1,2,5,6,7]),createClinica)

router.get("/me", checkAuth, getMe)

module.exports = router;
