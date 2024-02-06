const Medico = require("../models/medicoModel");
const User = require("../models/userModel");
const Persona = require("../models/personaModel");
const { generateJWT } = require("../helpers/token");
const bcrypt = require("bcrypt");
const Clinica = require("../models/clinicaModel");

module.exports.getMedicos = async (req, res, next) => {
  try {
    const medicos = await Medico.findAll({
      include: [
        {
          model: Clinica
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
  const { usuario ,especialidad, nombre, email, celular, password } = req.body;
  const { idClinica } = req.user;

  try {

    const persona = await Persona.create({
      nombre,
      email,
      celular,
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    const users = await User.create({
      username: usuario,
      password: hashedPassword,
      estado:1,
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
      msg: "Médico creado exitosamente",
      user: { users, access_token },
    });
  } catch (error) {
    next(error);
  }
};
