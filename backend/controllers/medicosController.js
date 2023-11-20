const Medicos = require("../models/medicoModel");
const User = require("../models/userModel");
const Persona = require("../models/personaModel")

module.exports.getMedicos = async (req, res, next) => {
  try {
    const medicos = await Medicos.findAll({
      include: [
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
