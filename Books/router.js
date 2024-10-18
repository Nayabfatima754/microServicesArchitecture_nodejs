const express = require('express')
const router = express.Router()
const Books = require('./model')

router.post('/addBook',async(req,res)=>{
    const {Title,Author,Publisher,numberOfPages}=req.body
    try{
        if(!Title || !Author){
            return res.status(400).json({message:"pleaser enter Title and Author"})
        }

        const Book = await Books.create({
            Title,
            Author,
            Publisher,
            numberOfPages
        })
        return res.status(200).json({message:`new Book added ${Book}`})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}),
// Example of how the books route might look
router.get('/:id', async (req, res) => {
    const bookID = req.params.id;
    try {
        const book = await Books.findById(bookID); // Assuming you have a Book model
        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }
        return res.status(200).json(book);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    }
});

router.get('/AllBooks',async(req,res)=>{
    try{
        Books = await Books.find()
        if(!Books){
            return res.status(404).json({message:"Books not found"})
        }
        return res.status(200).json({Books})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}),
router.get('/:Title',async(req,res)=>{
    const BookTitle = req.params.Title
    try{
        if(!BookTitle){

            return res.status(400).json({message:"Please enter Book title"})
        }
        const Book = await Books.findOne({BookTitle})
        if(!Book){
            return res.status(404).json({message:"Book not found"})
        }
        return res.status(200).json({Book})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}),
router.put('/:Title',async(req,res)=>{
    const BookTitle = req.params.Title
    try{
        if(!BookTitle){

            return res.status(400).json({message:"Please enter Book title you want to update"})
        }
        const Book = await Books.findOneAndUpdate( 
            { title: BookTitle }, // The filter to find the book by title
            { publisher: Publisher }, // The field to update
            { new: true } )
        if(!Book){
            return res.status(404).json({message:"Book not found"})
        }
        return res.status(200).json({message:`Book details updated successfully ${Book}`})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}),

router.delete('/:Title',async(req,res)=>{
    const BookTitle = req.params.Title
    try{
        if(!BookTitle){

            return res.status(400).json({message:"Please enter Book title you want to delete"})
        }
        const Book = await Books.findOneAndDelete()
        if(!Book){
            return res.status(404).json({message:"Book not found"})
        }
        return res.status(200).json({message:"Book deleted successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}),


//moongose aggregation

router.get('/:Author', async (req, res) => {
    const Author = req.params.Author;
    
    try {
        if (!Author) {
            return res.status(400).json({ message: "Please enter the author's name" });
        }

        const BooksByAuthor = await Books.aggregate([
            {
                $match: {
                    author: Author // Match books by the author field
                }
            },
            {
                $group: {
                    _id: '$author', // Group by the author's name
                    Books: { 
                        $push: { title: '$title', publisher: '$publisher' } // Create an array of objects with title and publisher
                    },
                    totalBooks: { $sum: 1 } // Count the total number of books
                }
            },
            {
                $sort: { totalBooks: -1 } // Sort by the total number of books in descending order
            }
        ]);

        if (!BooksByAuthor.length) {
            return res.status(404).json({ message: "No books found for the specified author" });
        }

        return res.status(200).json(BooksByAuthor);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});




module.exports=router;