const { DataTypes } = require("sequelize");
const bd = require("../db/db");

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
    },
    idAnalisis: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName:"solicituddetalle"
  }
);


module.exports = SolicitudDetalle;
