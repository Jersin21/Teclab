const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.checkPermission = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const idTipoUsuario = decoded.idTipoUsuario;

        req.user = { idTipoUsuario };

        if (!requiredRoles.includes(idTipoUsuario)) {
          return res.status(403).json({
            response: "error",
            message: "No tienes permisos para realizar esta acción",
          });
        }

        return next();
      }

      return res.status(401).json({
        response: "error",
        message: "No autorizado, no hay token",
      });
    } catch (error) {
      return res.status(401).json({
        response: "error",
        message: "No autorizado, el token no es válido",
      });
    }
  };
};


