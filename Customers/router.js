const express = require('express')
const router = express.Router()
const Customer = require('./model');
const mongoose = require('mongoose')

router.post('/addCustomer',async(req,res)=>{
    const {name,age,address}=req.body
    try{
        if(!name || !address){
            return res.status(400).json({message:"pleaser enter Name and address"})
        }

        const customer = await Customer.create({
            name,
            age,
            address,
            
        })
        return res.status(200).json({message:`new customer added ${customer}}`})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}),

router.get('/AllCustomers',async(req,res)=>{
    try{
        Customers = await Customer.find()
        if(!Customers){
            return res.status(404).json({message:"Customers not found"})
        }
        return res.status(200).json({Customers})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}),
router.get('/:id', async (req, res) => {
    const customerId = req.params.id;

    // Validate customer ID
    if (!customerId) {
        return res.status(400).json({ message: 'Please enter customer id' });
    }

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({ message: 'Invalid customer ID format' });
    }

    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        return res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.put('/:id',async(req,res)=>{
    const customerId = req.params.id
    try{
        if(!customerId){

            return res.status(400).json({message:"Please enter customer id you want to update"})
        }
        const customer = await Customer.findOneAndUpdate( customerId,  { name: this.name},{age:this.age},
            {address:this.address},{ new: true } )
        if(!customer){
            return res.status(404).json({message:"customer not found"})
        }
        return res.status(200).json({message:`customer details updated successfully ${customer}`})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}),

router.delete('/:id',async(req,res)=>{
    const customerId = req.params.id
    try{
        if(!customerId){

            return res.status(400).json({message:"Please enter customer id you want to delete"})
        }
        const customer = await Customer.findOneAndDelete()
        if(!customer){
            return res.status(404).json({message:"customer not found"})
        }
        return res.status(200).json({message:"customer deleted successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}),


//moongose aggregation

router.get('/:id', async (req, res) => {
    const customerId = req.params.id;
    
    try {
        if (!customerId) {
            return res.status(400).json({ message: "Please enter customer id" });
        }

        const customer = await Customer.aggregate([
            {
                $match: {
                    customerId: customerId // Match books by the author field
                }
            },
            {
                $group: {
                    _id, customerId,// Group by the author's name
                    Books: { 
                        $push: { name: '$name', age: '$age' } // Create an array of objects with title and publisher
                    },
                    totalCustomers: { $sum: 1 } // Count the total number of books
                }
            },
            {
                $sort: { totalCustomers: -1 } // Sort by the total number of books in descending order
            }
        ]);

        if (!customer.length) {
            return res.status(404).json({ message: "No customer found for the specified id" });
        }

        return res.status(200).json(customer);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});




module.exports=router;