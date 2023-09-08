const Solicitud = require("../models/analisysModel")

module.exports.solicitud = async (req, res, next) => {
    try {
        const solicitudes = await Solicitud.findAll();
       res.json(solicitudes);
    } catch (ex) {
      next(ex);
    }
  };