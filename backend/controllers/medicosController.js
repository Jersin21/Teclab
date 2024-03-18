const Medico = require("../models/medicoModel");
const User = require("../models/userModel");
const Persona = require("../models/personaModel");
const Solicitud = require("../models/analisysModel");
const Clinica = require("../models/clinicaModel");
const SolicitudDetalle = require("../models/solicituddetalleModel");
const Image = require("../models/imageModel");
const Resultado = require("../models/resultadoModel");

const { generateJWT } = require("../helpers/token");
const bcrypt = require("bcrypt");

const { Op } = require("sequelize");

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
module.exports.getMedicos = async (req, res, next) => {
  const { idClinica } = req.user;
  try {
    const medicos = await Medico.findAll({
      include: [
        {
          model: Clinica,
          where: {
            id: idClinica,
          },
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
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: usuario }, { email: email }],
      },
    });

    if (existingUser) {
      return res.json({ status: false, msg: "Ya existe el usuario" });
    }
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
    const medico = await Medico.findOne({ where: { id } });
    const idUsuario = medico.idUsuario;
    const solicitudes = await Solicitud.findAll({
      where: { idUsuarioMedico: idUsuario },
    });

    await Promise.all(
      solicitudes.map(async (solicitud) => {
        const solicitudDetalleId = solicitud.id;

        await SolicitudDetalle.destroy({
          where: { idSolicitud: solicitud.id },
          force: true,
        });
        await Resultado.destroy({
          where: { idSolicitudDetalle: solicitudDetalleId },
          force: true,
        });
        await Image.destroy({
          where: { idSolicitudDetalle: solicitudDetalleId },
          force: true,
        });
        await solicitud.destroy({ force: true });
      })
    );

    await Medico.destroy({ where: { id }, force: true });
    const users = await User.findOne({ where: { id: idUsuario } });
    await User.destroy({ where: { id: idUsuario }, force: true });
    await Persona.destroy({ where: { id: users.idPersona }, force: true });

    return res.json({ status: true });
  } catch (error) {
    console.error("Error al eliminar:", error);
    return res.json({ msg: error.message, status: false });
  }
};
