const Clinica = require("../models/clinicaModel");

module.exports.createClinica = async (req, res, next) => {
  const { nombre, direccion, telefono, especialidades } = req.body;
  try {
    const clinica = await Clinica.create({
      name: nombre,
      direccion,
      telefono,
      especialidades,
    });

    if (clinica) {
      return res.json({ status: true, clinica, msg: "Se creó exitosamente." });
    } else {
      return res.json({ status: false, msg: "No se pudo crear la clínica." });
    }
  } catch (error) {
    next(error);
  }
};
