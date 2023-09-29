const { Product } = require('../models/productsModels')

module.exports = { getProducts: async(req, res, next) => {
 const products = await Product.find()
    res.json(products)
}}