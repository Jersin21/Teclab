const { DataTypes } = require("sequelize");
const bd = require("../db/db");

const Categoria = bd.define(
  "categoria",
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
    tableName: "categoria",
    timestamps: false,
  }
);

module.exports = Categoria;
