import express from 'express';
const router = express.Router();
import Material from "../models/Material.mjs";
import { materials } from "../data/materials.mjs";


// Define routes here

// creating function to post insert data to the collection
async function insertMaterialData () {
    const existingMaterials = await Material.countDocuments();
    if (existingMaterials > 0) {
        console.log ("Materials data are already here, so not inserting now.")
        return;
    }
    else {
    const result = await Material.insertMany(materials);
    console.log(`${result.length} materials data have been inserted successfully.`);
    }
}

if (process.env.NODE_ENV !== "production") {
    insertMaterialData();
}

// GET /api/materials/ Retrieve all materials data
router.get("/", async (req, res) => {
    try {
        const materials = await Material.find();
        res.status(200).json(materials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving cups materials data" });
    }
});


// GET /api/materials/:material/ Retrieve a material data by the material name
router.get("/:material", async (req, res) => {
    try {
        const material = await Material.find({material: req.params.material });
        if (!material) {
            return res.status(404).json({ error: "Material data is not found" });
        }
        res.status(200).json(material);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving material data" });
    }
});



export default router;