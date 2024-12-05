//models/Book.js: Define the data model for the library's books.
import mongoose from "mongoose";

const cupSchema = new mongoose.Schema({
    brand_name: { type: String, required: true },
    capacity_in_oz: { type: Number, min: 50, max: 1000 }, // unit is mentioned in key
    price_in_dollars: { type: Number, max: 150 }, // unit is mentioned in key
    material: { type: String, required: true },
    manufactured_year: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
    is_available: { type: Boolean, default: true },
});



let Cup = mongoose.model('Cup', cupSchema);


//module.exports = Cup;
export default Cup;

