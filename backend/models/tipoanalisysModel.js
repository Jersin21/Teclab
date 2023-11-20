const { DataTypes } = require("sequelize");
const bd = require("../db/db");
const Categoria = require("./categoriaModel")

const Analisys = bd.define(
  "analisis",
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
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: "analisis",
  }
);
Analisys.belongsTo(Categoria, { foreignKey: 'idCategoria' });


module.exports = Analisys;
