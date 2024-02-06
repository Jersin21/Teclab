const { DataTypes } = require("sequelize");
const bd = require("../db/db");
const Solicitud = require("./analisysModel");
const Analisys = require("./tipoanalisysModel");
const Image = require("./imageModel");
const Resultado = require("./resultadoModel");

const SolicitudDetalle = bd.define(
  "solicituddetalle",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idSolicitud: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "solicitud",
        key: "id",
      },
    },
    idAnalisis: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "analisis",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "solicituddetalle",
  }
);

SolicitudDetalle.belongsTo(Analisys, { foreignKey: "idAnalisis" });
SolicitudDetalle.hasOne(Resultado, { foreignKey: 'idSolicitudDetalle' });
SolicitudDetalle.hasMany(Image, { foreignKey: 'idSolicitudDetalle' });


module.exports = SolicitudDetalle;
