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


module.exports.createClinica = async (req, res, next) => {
  const { name, direccion, telefono, especialidades, responsable, password } =
    req.body;
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: responsable }],
      },
    });

    if (existingUser) {
      return res.json({ status: false, msg: "Ya existe el usuario" });
    }
    const clinica = await Clinica.create({
      name,
      direccion,
      telefono,
      especialidades,
    });
    const persona = await Persona.create({
      nombre: responsable,
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
    const { name, direccion, telefono, especialidades } = req.body;

    const clinica = await Clinica.update(
      { name, direccion, telefono, especialidades },
      { where: { id } }
    );
    return res.json({status:true, clinica });
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
    const medicos = await Medico.findAll({ where: { idClinica: id } });
    await Promise.all(
      medicos.map(async (medico) => {
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

        await Medico.destroy({ where: { idUsuario }, force: true });
        const user = await User.findOne({ where: { id: idUsuario } });
        await User.destroy({ where: { id: idUsuario }, force: true });
        await Persona.destroy({ where: { id: user.idPersona }, force: true });
      })
    );

    await Clinica.destroy({ where: { id }, force: true });

    return res.json({ status: true });
  } catch (error) {
    console.error("Error al eliminar:", error);
    return res.json({ msg: error.message, status: false });
  }
};

