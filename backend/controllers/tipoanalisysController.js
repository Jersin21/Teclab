const Analisys = require("../models/tipoanalisysModel");

module.exports.TipoAnalisis = async (req, res, next) => {
  try {
    const analisis = await Analisys.findAll();
    res.json(analisis);
  } catch (error) {
    next(error);
  }
};
