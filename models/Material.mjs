import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
    material: { type: String, required: true },
    body: { type: String, required: true, maxLength: 1000 }, 

});
materialSchema.index({ material: 1 });
let Material = mongoose.model('Material', materialSchema);


export default Material;


