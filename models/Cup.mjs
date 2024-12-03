//models/Book.js: Define the data model for the library's books.
import mongoose from "mongoose";

const cupSchema = new mongoose.Schema({
    brand_name: { type: String, required: true },
    capacity: { type: String, required: true },
    price: { type: String, required: true },
    material: { type: String, required: true },
    image_url: { type: String },
    manufactured_year: { type: Number, required: true },
    is_available: { type: Boolean, default: true },
});

let Cup = mongoose.model('Cup', cupSchema);


//module.exports = Cup;
export default Cup;

