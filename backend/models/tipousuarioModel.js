const { DataTypes } = require("sequelize");
const bd = require("../db/db");

const TipoUsuario = bd.define(
  "tipousuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName:"tipousuario"
  }
);

module.exports = TipoUsuario;
