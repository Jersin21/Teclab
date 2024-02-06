const { DataTypes } = require("sequelize");
const bd = require("../db/db");
const Users = require("./userModel");

const Clinica = bd.define(
  "clinica",
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
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especialidades: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "clinica",
  }
);
Users.belongsTo(Clinica, { foreignKey: 'idClinica' });
Clinica.hasMany(Users, { foreignKey: 'idClinica' });

module.exports = Clinica;
