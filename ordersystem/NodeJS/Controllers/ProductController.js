const ProductRepo   = require('../Data/ProductRepo');
const _productRepo  = new ProductRepo();


exports.Index = async function(request, response){
    let products = await _productRepo.allProducts();
    if(products!= null) {
        // response.render('Product/Index', { products:products })
        response.json({products:products});
    }
    else {
        // response.render('Product/Index', { products:[] })
        response.json({products:[]});
    }
};

exports.Detail = async function(request, response) {
    // request.query used to get url parameter.
    let productID  = request.query._id; 
    
    let productObj = await _productRepo.getProduct(productID);
    // response.render('Product/Detail', { product:productObj });
    response.json({ product:productObj});
}