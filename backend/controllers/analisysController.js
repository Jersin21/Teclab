const Solicitud = require("../models/analisysModel");

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
    const { name, tipo, date, descripcion } = req.body;

    const newAnalisys = await Solicitud.create({
      paciente: name,
      fecha: date,
      muestra: tipo,
      observaciones: descripcion,
      estado: "Iniciado",
      idUsuarioMedico: 1,
      idUsuarioLab: "",
    });
    console.log(newAnalisys);

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
    analisys.paciente = name;
    analisys.muestra = tipo;
    analisys.fecha = date;
    analisys.observaciones = descripcion;
    await analisys.save();

    return res.json({ status: true, analisys });
  } catch (error) {
    return res.json({ msg: error, status: false });
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
