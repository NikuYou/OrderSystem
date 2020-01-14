const Product = require('../Models/Product');

class ProductRepo {
    
    // This is the constructor.
    ProductRepo() {        
    }

    // Gets all products.
    async allProducts() {     
        let products = await Product.find().exec();
        return   products;
    }

    async getProduct(id) {  
        let product = await Product.findOne({_id:id}).exec();
        return   product;
    }
    
}

module.exports = ProductRepo;