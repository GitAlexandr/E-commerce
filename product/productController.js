const Product = require('../models/Product')


class productController{
    async addProducts(req, res) {
        try{
                const {title, description, price} = req.body;
                const candidate = await Product.findOne({title})
                if (candidate) {
                    return res.status(409).json({status: false, error: 'Conflict', message: "Товар с таким названием уже существует"})
                }
                const product = new Product({title, description, price})
                await product.save()
                return res.status(201).json({status: true, message: "Товар успешно добавлен" });
        } catch (e){
            console.log(e)
            res.status(500).json({status: false, error: 'Internal Server Error', message: 'Add error'})
        }
    }

    async getProducts(req, res){
        try{
            const products = await Product.find()
            res.json(products)
        } catch (e){
            console.log(e)
        }
    }
}

module.exports = new productController()