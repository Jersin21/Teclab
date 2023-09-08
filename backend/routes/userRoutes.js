const { register, login } = require("../controllers/userController")
const {solicitud} = require("../controllers/analisysController")

const router = require("express").Router()

router.post("/register",register)
router.post("/login",login)
router.get("/analisis",solicitud)



module.exports = router