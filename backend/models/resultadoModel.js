const { DataTypes } = require("sequelize");
const bd = require("../db/db");
const SolicitudDetalle = require("./solicituddetalleModel")

const Resultado = bd.define(
  "resultado",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    detalle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    idSolicitudDetalle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName:"resultado"
  }
);

Resultado.belongsTo(SolicitudDetalle, { foreignKey: 'idSolicitudDetalle'});

module.exports = Resultado;
