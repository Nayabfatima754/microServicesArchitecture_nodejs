const express = require('express')
const router = express.Router()
const Order = require('./model');
const axios = require('axios')

router.post('/addOrder',async(req,res)=>{
    try {
        const { customerID, bookID, initialDate, deliveryDate } = req.body;

        // Ensure all required fields are provided
        if (!customerID || !bookID || !initialDate || !deliveryDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new order
        const order = new Order({
            customerID,
            bookID,
            initialDate,
            deliveryDate
        });

        // Save the order
        await order.save();
        res.status(201).json({message:"new order created"+ order});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/AllOrders',async(req,res)=>{
    try{
        Orders = await Order.find()
        if(!Orders){
            return res.status(404).json({message:"Orders not found"})
        }
        return res.status(200).json(Orders)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}),
router.get('/:id', async (req, res) => {
    const orderID = req.params.id;
    try {
        // Fetch the order by ID
        const order = await Order.findById(orderID);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Convert customerID and bookID to strings
        const customerID = order.customerID.toString();
        const bookID = order.bookID.toString();

    
        // Fetch customer details
        const customerResponse = await axios.get(`http://localhost:4545/Customers/${customerID}`);
        const customerName = customerResponse.data.name; // Assuming the customer object has a 'name' field

        // Fetch book details using bookID from order
        const bookResponse = await axios.get(`http://localhost:3000/Books/${bookID}`);
        const bookTitle = bookResponse.data.Title; // Assuming the book object has a 'title' field

        // Construct the response object
        const response = {
            customerName: customerName,
            bookTitle: bookTitle,
            order: order // Include the order data if needed
        };

        // Send successful response with status 200
        return res.status(200).json(response);
    } catch (err) {
        // Handle specific error responses
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ message: 'Customer or Book not found.' });
        }

        console.error('Error fetching order details:', err.message);
        return res.status(500).json({ message: "Internal server error." });
    }
});

module.exports=router;