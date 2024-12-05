import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    brand_name: { 
        type: String, 
        required: true 
    },

    manufactured_year: { 
        type: Number, 
        required: true, 
        min: 1900, 
        max: new Date().getFullYear() 
    },
    
    body: { 
        type: String, 
        required: true,  
        minLength: 100, 
        maxLength: 300 
    },
});

// indexing the brand_name this can make querying faster
reviewSchema.index({ brand_name: 1 });

let Review = mongoose.model('Review', reviewSchema);

export default Review;




