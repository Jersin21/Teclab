const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Verifica si ya existe un usuario con el mismo nombre de usuario
    const usernameCheck = await User.findOne({
      where: { username: username },
    });

    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }

    // Verifica si ya existe un usuario con la misma dirección de correo electrónico
    const emailCheck = await User.findOne({
      where: { email: email },
    });

    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    // Si no hay duplicados, hashea la contraseña y crea el usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
      estado: 1,
      idPersona: 41,
      idTipoUsuario: 1,
    });

    // Elimina la contraseña del usuario antes de enviar la respuesta
    delete newUser.dataValues.password;

    return res.json({ status: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
