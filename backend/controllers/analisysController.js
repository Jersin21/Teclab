const Solicitud = require("../models/analisysModel");
const SolicitudDetalle = require("../models/solicituddetalleModel");
const Image = require("../models/imageModel");
const Resultado = require("../models/resultadoModel");
const Analisys = require("../models/tipoanalisysModel");
const Categoria = require("../models/categoriaModel");
const Medico = require("../models/medicoModel");
const { Op } = require("sequelize");
const User = require("../models/userModel");
const Clinica = require("../models/clinicaModel");
const TipoUsuario = require("../models/tipousuarioModel");
const Persona = require("../models/personaModel");

module.exports.solicitudes = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const solicitudes = await Solicitud.findAll({
      where: {
        estado: {
          [Op.or]: ["Iniciado", "Pendiente", "Completado"],
        },
        idUsuarioMedico: userId,
      },
    });

    res.json(solicitudes);
  } catch (ex) {
    next(ex);
  }
};
module.exports.solicitud = async (req, res, next) => {
  try {
    const { id } = req.params;
    const solicitud = await Solicitud.findOne({
      where: { id: id },
      include: [
        {
          model: SolicitudDetalle,
          attributes: ["idAnalisis"],
        },
      ],
    });

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
      idUsuarioMedico: req.user.id,
    });
    for (const id of idAnalisis) {
      await SolicitudDetalle.create({
        idSolicitud: newAnalisys.id,
        idAnalisis: id,
      });
    }
    return res.json({ status: true, newAnalisys });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
module.exports.updateAnalisys = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, tipo, date, descripcion, idAnalisis } = req.body;

    const analisys = await Solicitud.findByPk(id, {
      include: [
        {
          model: SolicitudDetalle,
        },
      ],
    });
    if (!analisys) {
      return res
        .status(404)
        .json({ status: false, msg: "Análisis no encontrado" });
    }
    const existingAnalisisIds = analisys.solicituddetalles.map(
      (detalle) => detalle.idAnalisis
    );

    const idsToAdd = idAnalisis.filter(
      (id) => !existingAnalisisIds.includes(id)
    );
    const idsToRemove = existingAnalisisIds.filter(
      (id) => !idAnalisis.includes(id)
    );

    for (const id of idsToAdd) {
      await SolicitudDetalle.create({
        idSolicitud: analisys.id,
        idAnalisis: id,
      });
    }

    await SolicitudDetalle.destroy({
      where: { idSolicitud: analisys.id, idAnalisis: idsToRemove },
    });

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
  const { id } = req.params;

  try {
    const solicituddetalles = await SolicitudDetalle.findAll({
      where: { idSolicitud: id },
    });

    await Promise.all(
      solicituddetalles.map(async (detalle) => {
        await Resultado.destroy({
          where: { idSolicitudDetalle: detalle.id },
          force: true,
        });
        await Image.destroy({
          where: { idSolicitudDetalle: detalle.id },
          force: true,
        });
      })
    );

    await SolicitudDetalle.destroy({ where: { idSolicitud: id } });

    const solicitud = await Solicitud.findByPk(id);

    await solicitud.destroy({ force: true });

    return res.json({ status: true, solicitud });
  } catch (error) {
    console.error("Error al eliminar:", error);
    return res.json({ msg: error.message, status: false });
  }
};

module.exports.getSolicitudRecepcionista = async (req, res, next) => {
  try {
    const solicitudes = await Solicitud.findAll({
      where: {
        estado: "Iniciado",
        idUsuarioLab: null,
      },
    });

    const idsMedicos = solicitudes.map(
      (solicitud) => solicitud.idUsuarioMedico
    );

    const medicos = await Medico.findAll({
      where: {
        idUsuario: {
          [Op.in]: idsMedicos,
        },
      },
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

    const solicitudesConMedicos = solicitudes.map((solicitud) => {
      const medicoAsignado = medicos.find(
        (medico) => medico.idUsuario === solicitud.idUsuarioMedico
      );
      return {
        ...solicitud.toJSON(),
        medico: medicoAsignado ? medicoAsignado.toJSON() : null,
      };
    });

    res.json({ solicitudes: solicitudesConMedicos });
  } catch (error) {
    console.error("Este es el error:", error);
    res.json({ msg: "No se pudo obtener los datos", status: false });
  }
};

module.exports.getSolicitudResponsable = async (req, res, next) => {
  try {
    const idUsuarioLab = req.user.id;

    // Obtener las solicitudes pendientes para el usuario responsable
    const SolicitudResponsable = await Solicitud.findAll({
      where: { estado: "Pendiente", idUsuarioLab },
    });

    // Obtener información adicional de los médicos asociados a las solicitudes
    const idsMedicos = SolicitudResponsable.map(
      (solicitud) => solicitud.idUsuarioMedico
    );
    const medicos = await Medico.findAll({
      where: { idUsuario: { [Op.in]: idsMedicos } },
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

    // Agrupar las solicitudes con sus médicos correspondientes
    const solicitudesConMedicos = SolicitudResponsable.map((solicitud) => {
      const medicoAsignado = medicos.find(
        (medico) => medico.idUsuario === solicitud.idUsuarioMedico
      );
      return {
        ...solicitud.toJSON(),
        medico: medicoAsignado ? medicoAsignado.toJSON() : null,
      };
    });

    res.json({ solicitudes: solicitudesConMedicos });
  } catch (error) {
    console.error("Error al obtener las solicitudes:", error);
    res.json({ msg: "No se pudo obtener los datos", status: false });
  }
};

module.exports.subirResultado = async (req, res, next) => {
  const { results } = req.body;
  const images = req.files;
  const { id } = req.params;
  try {
    const solicitud = await Solicitud.findByPk(id);
    if (solicitud) {
      await solicitud.update({
        estado: "Completado",
      });
    }
    const resultadosPromises = JSON.parse(results).map(async (result) => {
      const fechaActual = new Date();
      const today = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${fechaActual
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      const resultado = await Resultado.create({
        fecha: today,
        detalle: result.value,
        idSolicitudDetalle: result.id,
      });
      return resultado;
    });
    for (const image of images) {
      const idSolicitudDetalleMatch = image.filename.match(/^(\d+)-/);
      const idSolicitudDetalle = idSolicitudDetalleMatch
        ? idSolicitudDetalleMatch[1]
        : null;

      if (idSolicitudDetalle) {
        await Image.create({
          image_path: `images/${image.filename}`,
          idSolicitudDetalle,
        });
      }
    }

    const resultados = await Promise.all(resultadosPromises);
    return res.json({
      status: true,
      message: "Imágenes guardadas correctamente.",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports.getAnalisys = async (req, res, next) => {
  try {
    const { id } = req.params;
    const solicitud = await Solicitud.findByPk(id, {
      include: [
        {
          model: SolicitudDetalle,
          attributes: ["idAnalisis", "id"],
          include: {
            model: Analisys,
            attributes: ["name"],
            include: {
              model: Categoria,
              attributes: ["name"],
            },
          },
        },
      ],
    });

    if (!solicitud) {
      return res
        .status(404)
        .json({ status: false, message: "Solicitud no encontrada" });
    }
    return res.json({ status: true, solicitud });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports.getAnalisysVer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const solicitud = await Solicitud.findByPk(id, {
      include: [
        {
          model: SolicitudDetalle,
          include: [
            {
              model: Analisys,
              attributes: ["name"],
              include: {
                model: Categoria,
                attributes: ["name"],
              },
            },
            {
              model: Resultado, 
            },
            {
              model: Image, 
            },
          ],
        },
      ],
    });

    if (!solicitud) {
      return res.status(404).json({ status: false, message: "Solicitud no encontrada" });
    }

    const medico = await Medico.findOne({
      where: {
        idUsuario: solicitud.idUsuarioMedico,
      },
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

    const solicitudConMedico = {
      ...solicitud.toJSON(),
      medico: medico ? medico.toJSON() : null,
    };

    return res.json({ status: true, solicitud: solicitudConMedico });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

