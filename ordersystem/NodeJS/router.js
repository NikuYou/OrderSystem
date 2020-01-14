var HomeController    = require('./Controllers/HomeController');
var ProductController = require('./Controllers/ProductController');
var OrderController = require('./Controllers/OrderController');
const cors = require('cors');

// Routes
module.exports = function(app){  
    // Main Routes
    app.get('/',      HomeController.Index);    

    app.get('/Product/Index', cors(), ProductController.Index);

    app.get('/Order/Index', cors(), OrderController.Index);
    app.post('/Order/CreateOrder', cors(), OrderController.CreateOrder);
    app.delete('/Order/Delete', cors(), OrderController.Delete);
};
