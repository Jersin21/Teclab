const Solicitud = require("../models/analisysModel");
const SolicitudDetalle = require("../models/solicituddetalleModel");
const solicitudDetalle = require("../models/solicituddetalleModel");

module.exports.solicitudes = async (req, res, next) => {
  try {
    const solicitudes = await Solicitud.findAll();
    res.json(solicitudes);
  } catch (ex) {
    next(ex);
  }
};
module.exports.solicitud = async (req, res, next) => {
  try {
    const { id } = req.params;
    const solicitud = await Solicitud.findOne({ where: { id: id } });
    res.json(solicitud);
  } catch (ex) {
    next(ex);
  }
};
module.exports.registerAnalisys = async (req, res, next) => {
  try {
    const { name, tipo, date, descripcion, idAnalisis } = req.body;

    const newAnalisys = await Solicitud.create({
      paciente: name,
      fecha: date,
      muestra: tipo,
      observaciones: descripcion,
      estado: "Iniciado",
      idUsuarioMedico: 13,
    });
    for (const id of idAnalisis) {
      await SolicitudDetalle.create({
        idSolicitud: newAnalisys.id,
        idAnalisis: id,
      });
    }
    return res.json({ status: true, newAnalisys });
  } catch (error) {
    console.log(error);

    return res.json({ msg: error, status: false });
  }
};
module.exports.updateAnalisys = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, tipo, date, descripcion } = req.body;

    const analisys = await Solicitud.findByPk(id);

    if (!analisys) {
      return res
        .status(404)
        .json({ status: false, msg: "Análisis no encontrado" });
    }

    const updatedAnalisys = await analisys.update({
      paciente: name,
      muestra: tipo,
      fecha: date,
      observaciones: descripcion,
    });

    return res.json({ status: true, analisys: updatedAnalisys });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error interno del servidor", status: false });
  }
};

module.exports.asignarResponsable = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idUsuarioLab } = req.body;

    const asignar = await Solicitud.findByPk(id);

    if (!asignar) {
      return res
        .status(404)
        .json({ status: false, msg: "Solicitud no encontrada" });
    }

    const updatedAsignar = await asignar.update({
      idUsuarioLab,
      estado: "Pendiente",
    });

    return res.json({ status: true, asignar: updatedAsignar });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports.deleteAnalisys = async (req, res, next) => {
  try {
    const { id } = req.params;
    const solicitud = await Solicitud.destroy({ where: { id } });
    return res.json({ status: true, solicitud });
  } catch (error) {
    return res.json({ msg: error, status: false });
  }
};
module.exports.getSolicitudRecepcionista = async (req, res, next) => {
  try {
    const SolicitudRecepcionista = await Solicitud.findAll({
      where: { estado: "Iniciado" },
    });
    res.json(SolicitudRecepcionista);
  } catch (error) {
    res.json({ msg: "No se pudo obtener los datos", status: false });
  }
};

module.exports.getSolicitudResponsable = async (req, res, next) => {
  try {
    const SolicitudResponsable = await Solicitud.findAll({
      where: { estado: "Pendiente" },
    });
    res.json(SolicitudResponsable);
  } catch (error) {
    res.json({ msg: "No se pudo obtener los datos", status: false });
  }
};
