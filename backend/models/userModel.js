const { DataTypes } = require("sequelize");
const bd = require("../db/db");
const Persona = require("./personaModel");
const TipoUsuario = require("./tipousuarioModel");

const User = bd.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idPersona: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idTipoUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idClinica: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
  },
  {
    timestamps: false,
  }
);

User.belongsTo(Persona, { foreignKey: "idPersona",onDelete:'CASCADE' });

User.belongsTo(TipoUsuario, { foreignKey: 'idTipoUsuario' });

module.exports = User;
