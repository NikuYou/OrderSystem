var mongoose         = require('mongoose');

var orderSchema    = mongoose.Schema({
        // The _id property serves as the primary key. If you don't include it
        // the it is added automatically. However, you can add it in if you
        // want to manually include it when creating an object.

        // _id property is created by default when data is inserted.
        _id:            {"type" : Number, min:0, max:1000000},
        firstName:      {"type" : "String", required: true},
        lastName:       {"type" : "String", required: true},
        address:        {"type" : "String", required: true},
        amount:         {"type" : Number},
    }, 
    {   // Include this to eliminate the __v attribute which otherwise gets added
        // by default.
        versionKey: false 
    });
var Order    = mongoose.model('Order', orderSchema);
module.exports = Order;
