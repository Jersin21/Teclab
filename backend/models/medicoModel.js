const { DataTypes } = require("sequelize");
const bd = require("../db/db");
const User = require("./userModel")
const Clinica = require("./clinicaModel")

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
Medico.belongsTo(User, { foreignKey: "idUsuario" });

Clinica.hasMany(Medico, { foreignKey: 'idclinica', sourceKey: 'id' });
Medico.belongsTo(Clinica, { foreignKey: 'idclinica', targetKey: 'id' });

module.exports = Medico;
