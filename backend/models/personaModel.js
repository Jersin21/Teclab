const { DataTypes } = require("sequelize");
const bd = require("../db/db");

const Persona = bd.define(
  "persona",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    timestamps: false,
    tableName: "persona",
  }
);



module.exports = Persona;
