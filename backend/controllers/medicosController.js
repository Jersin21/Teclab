const Medicos = require("../models/medicoModel");

module.exports.getMedicos = async (req, res, next) => {
  try {
    const medicos = await Medicos.findAll();
    res.json(medicos);
  } catch (error) {
    next(error);
  }
};
