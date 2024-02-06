const Clinica = require("../models/clinicaModel");
const User = require("../models/userModel");
const { generateJWT } = require("../helpers/token");
const bcrypt = require("bcrypt");
const Persona = require("../models/personaModel");

module.exports.createClinica = async (req, res, next) => {
  const { nombre, direccion, telefono, especialidades, responsable, password } = req.body;
  try {
    const clinica = await Clinica.create({
      name: nombre,
      direccion,
      telefono,
      especialidades,
    });
    const persona = await Persona.create({
      nombre: nombre,
      email: "jjjj@gmail.com",
      celular: "###",
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await User.create({
      username: responsable,
      password: hashedPassword,
      estado: 1,
      email: "jjjj@gmail.com",
      idPersona: persona.id,
      idTipoUsuario: 2,
      idClinica: clinica.id,
    });
    delete users.dataValues.password;
    const access_token = generateJWT(users.id);

    if (clinica) {
      return res.json({ status: true,msg: "Se creo exitosamente.", user: { users, access_token } });
    } else {
      return res.json({ status: false, msg: "No se pudo crear la clínica." });
    }
  } catch (error) {
    next(error);
    console.error(error)
  }
};
