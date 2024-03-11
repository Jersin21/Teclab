const Clinica = require("../models/clinicaModel");
const User = require("../models/userModel");
const { generateJWT } = require("../helpers/token");
const bcrypt = require("bcrypt");
const Persona = require("../models/personaModel");

module.exports.createClinica = async (req, res, next) => {
  const { nombre, direccion, telefono, especialidades, responsable, password } =
    req.body;
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
      return res.json({
        status: true,
        msg: "Se creo exitosamente.",
        user: { users, access_token },
      });
    } else {
      return res.json({ status: false, msg: "No se pudo crear la clínica." });
    }
  } catch (error) {
    next(error);
    console.error(error);
  }
};
module.exports.getClinica = async (req, res, next) => {
  const { id } = req.params;
  try {
    const clinica = await Clinica.findOne({ where: { id } });

    res.json(clinica);
  } catch (error) {
    next(error);
  }
};
module.exports.getClinicas = async (req, res, next) => {
  try {
    const clinicas = await Clinica.findAll();

    res.json(clinicas);
  } catch (error) {
    next(error);
  }
};
module.exports.updateClinica = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, direccion, telefono, especialidades} = req.body;

    await Clinica.update(
      { name, direccion, telefono, especialidades },
      { where: { id } }
    );
    return res.json();
  } catch (error) {
    console.error(error);
    s;
    return res
      .status(500)
      .json({ msg: "Error interno del servidor", status: false });
  }
};
module.exports.deleteClinica = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Clinica.destroy({ where: { id }, force: true });
    return res.json({ status: true });
  } catch (error) {
    console.error("Error al eliminar:", error);
    return res.json({ msg: error, status: false });
  }
};
