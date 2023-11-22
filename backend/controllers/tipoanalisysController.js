const Analisys = require("../models/tipoanalisysModel");
const Categoria = require("../models/categoriaModel");

module.exports.TipoAnalisis = async (req, res, next) => {
  try {
    const analisis = await Analisys.findAll({
      include: [
        {
          model: Categoria,
        },
      ],
     
    });

    
    res.json(analisis);
  } catch (error) {
    next(error);
  }
};
