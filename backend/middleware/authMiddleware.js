const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findByPk(decoded.id, {
        attributes: ["username", "email","idTipoUsuario","id","idClinica"],
      });

      return next();
    } catch (error) {
      
      
      return res.status(401).json({
        response: "error",
        message: "No autorizado, el token no es válido",
      });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ response: "error", message: "No autorizado, no hay token" });
  }

  return next();
};

module.exports.checkPermission = (requiredRoles) => {
  return (req, res, next) => {
    const userRole = req.user ? req.user.idTipoUsuario : null;

    if (userRole && requiredRoles.includes(userRole)) {
      next(); 
    } else {
      res.status(403).json({ message: 'Acceso denegado. No tienes los permisos necesarios.' });
    }
  };
};



