const { generateJWT } = require("../helpers/token");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Persona = require("../models/personaModel")


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
    const access_token = generateJWT(user.id, user.idTipoUsuario);

    return res.json({ status: true, user:{user, access_token} });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getMe = async (req, res) => {
  const { user } = req;
  return res.status(200).json(user);
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({
      where: { username: username },
    });

    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({
      where: { email: email },
    });

    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
      estado: 1,
      idPersona: 41,
      idTipoUsuario: 5,
    });

    delete newUser.dataValues.password;
    const access_token = generateJWT(newUser.id);

    return res.json({ status: true, user: { newUser, access_token } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports.getResponsable = async (req, res, next) => {
  try {
    const responsables = await User.findAll({
      where: { idTipoUsuario: 6 }, 
      include: [
        {
          model: Persona,
        },
      ],
    });
    res.json(responsables);
  } catch (error) {
    next(error);
  }
};

