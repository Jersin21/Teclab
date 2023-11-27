const { DataTypes } = require("sequelize");
const bd = require("../db/db");
const SolicitudDetalle = require("./solicituddetalleModel")


const Image = bd.define(
  "image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    idSolicitudDetalle: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: "image",
  }
);
Image.belongsTo(SolicitudDetalle, { foreignKey: 'idSolicitudDetalle'});


module.exports = Image;
