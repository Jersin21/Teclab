const User = require("./userModel");
const Persona = require("./personaModel");
const Clinica = require("./clinicaModel");
const Solicitud = require("./analisysModel");
const Medico = require("./medicoModel");
const Resultado = require("./resultadoModel");
const SolicitudDetalle = require("./solicituddetalleModel");
const Analisys = require("./tipoanalisysModel");
const TipoUsuario = require("./tipousuarioModel");
const Categoria = require("./categoriaModel")



User.hasOne(TipoUsuario, { foreignKey: "idTipoUsuario", targetKey: "id" });
TipoUsuario.belongsTo(User, { foreignKey: "idTipoUsuario", targetKey: "id" });

Categoria.hasMany(Analisys, { foreignKey: "idCategoria", targetKey: "id" });
Analisys.belongsTo(Categoria, { foreignKey: "idCategoria", targetKey: "id" });



Medico.belongsTo(Clinica, { foreignKey: "idClinica", targetKey: "id" });
Clinica.hasOne(Medico, { foreignKey: "idClinica", targetKey: "id" });






module.exports = {
  User,
  Persona,
  Clinica,
  Solicitud,
  SolicitudDetalle,
  Medico,
  Resultado,
  Analisys,
  TipoUsuario,
  Categoria
};
