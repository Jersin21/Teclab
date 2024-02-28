const Medico = require("../models/medicoModel");
const User = require("../models/userModel");
const Persona = require("../models/personaModel");
const { generateJWT } = require("../helpers/token");
const bcrypt = require("bcrypt");
const Clinica = require("../models/clinicaModel");

module.exports.getMedicos = async (req, res, next) => {
  try {
    const medicos = await Medico.findAll({
      include: [
        {
          model: Clinica,
        },
        {
          model: User,
          include: {
            model: Persona,
          },
        },
      ],
    });
    res.json(medicos);
  } catch (error) {
    next(error);
  }
};
module.exports.createMedico = async (req, res, next) => {
  const { usuario, especialidad, nombre, email, celular, password } = req.body;
  const { idClinica } = req.user;

  try {
    const persona = await Persona.create({
      nombre,
      email,
      celular,
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    const users = await User.create({
      username: usuario,
      password: hashedPassword,
      estado: 1,
      email,
      idPersona: persona.id,
      idTipoUsuario: 5,
      idClinica,
    });

    const medico = await Medico.create({
      especialidad,
      idClinica,
      idUsuario: users.id,
    });

    delete users.dataValues.password;
    const access_token = generateJWT(users.id);
    return res.json({
      status: true,
      msg: "Médico creado exitosamente",
      user: { users, access_token },
    });
  } catch (error) {
    next(error);
  }
};
module.exports.updateMedico = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, celular, especialidad, email, userid, personaid } =
      req.body;

    await Medico.update({ especialidad }, { where: { id } });

    await User.update({ email }, { where: { id: userid } });

    await Persona.update(
      { nombre, email, celular },
      { where: { id: personaid } }
    );

    const updatedMedico = await Medico.findByPk(id);

    return res.json({ status: true, medico: updatedMedico });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error interno del servidor", status: false });
  }
};
module.exports.deleteMedico = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Medico.destroy({ where: { id } });
    return res.json({ status: true });
  } catch (error) {
    console.error("Error al eliminar:", error);
    return res.json({ msg: error, status: false });
  }
};
module.exports.getMedico = async (req, res, next) => {
  try {
    const { id } = req.params;
    const medico = await Medico.findOne({
      where: { id: id },
      include: [
        {
          model: Clinica,
        },
        {
          model: User,
          include: {
            model: Persona,
          },
        },
      ],
    });
    res.json(medico);
  } catch (error) {
    next(error);
  }
};
