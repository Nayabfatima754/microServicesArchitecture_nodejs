const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Customers",
        required: true
    },
    bookID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    initialDate: { // Also fixed the typo here from "initialeDate" to "initialDate"
        type: Date,
        ref:"Books",
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
