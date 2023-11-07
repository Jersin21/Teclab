const { DataTypes } = require("sequelize");
const bd = require("../db/db");

const Medico = bd.define(
  "medico",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    idClinica: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "medico",
  }
);

module.exports = Medico;
