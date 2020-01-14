const OrderRepo   = require('../Data/OrderRepo');
const _orderRepo  = new OrderRepo();
const Order       = require('../Models/Order');
const sortID = (orders) => {
    return orders.sort(function(a, b){
      return  a._id -  b._id;
    });
  };

exports.Index = async function(request, response){
    let orders = await _orderRepo.allOrders();
    if(orders!= null) {
        response.json({orders:orders});
    }
    else {
        response.json({orders:[]});
    }
};

exports.CreateOrder = async function(request, response) {
    let orders = await _orderRepo.allOrders();
    sortID(orders);
    if (orders.length != 0){
        var num = orders[orders.length-1]._id+1;
    }
    else{
        var num = 1;
    }
    let tempOrderObj  = new Order( {
        "_id": num,
        "firstName": request.body.firstName,
        "lastName": request.body.lastName,
        "address": request.body.address,
        "amount": request.body.amount,
    });
    let responseObject = await _orderRepo.create(tempOrderObj);

    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        response.json({ order:responseObject.obj, errorMessage:""});
    }
    else {
        console.log("An error occured. Item not created.");
        response.json({ order:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
    }
};


exports.Delete = async function(request, response) {
    let id           = request.body._id;
    let deletedItem  = await _orderRepo.delete(id);
    console.log(JSON.stringify(deletedItem));
    let orders     = await _orderRepo.allOrders();
    response.json({orders:orders});
}

