import express from 'express';
const router = express.Router();
import Cup from "../models/Cup.mjs";
import { cups } from "../data/cups.mjs";

// Define routes here

//routes/cupRoutes.js: Create an Express router. This file is empty except for the structure:


// creating function to post insert data to the collection
async function insertCupData () {
    const existingCups = await Cup.countDocuments();
    if (existingCups > 0) {
        console.log ("Cups are already here, so not inserting now.")
        return;
    }
    else {
    const result = await Cup.insertMany(cups);
    console.log(`${result.length} cups have been inserted successfully.`);
    }
}

if (process.env.NODE_ENV !== "production") {
    insertCupData();
}


// /api/cups/
router.post("/", async (req, res) => {
    try {
        const cup = {
            brand_name: req.body.brand_name,
            capacity: req.body.capacity,
            price: req.body.price,
            material: req.body.material,
            image_url: req.body.image_url,
            manufactured_year: req.body.manufactured_year
        };

        // Create the cup using your Cup model
        const newCup = await Cup.create(cup);

        // Respond with the newly created cup and status 201
        res.status(201).send(newCup);
    } catch (error) {
        // Log the error and respond with a 500 status
        console.error(error);
        res.status(500).send({ error: "Error creating cup" });
    }
});


// GET /api/cups/ Retrieve all cups
router.get("/", async (req, res) => {
    try {
        const cups = await Cup.find();
        res.status(200).json(cups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving cups" });
    }
});


// GET /api/cups/:id/ Retrieve a cup by its ID
router.get("/:id", async (req, res) => {
    try {
        const cup = await Cup.findById(req.params.id);
        if (!cup) {
            return res.status(404).json({ error: "Cup is not found" });
        }
        res.status(200).json(cup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving cup" });
    }
});


// PUT /api/cups/:id/ Update a cup's details
router.put("/:id", async (req, res) => {
    try {
        const updatedCup = await Cup.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Returns the updated cup and validates the update
        );

        if (!updatedCup) {
            return res.status(404).json({ error: "Cup is not found" });
        }
        res.status(200).json(updatedCup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating cup" });
    }
});

// DELETE /api/cups/:id/ Delete a cup by its ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedCup = await Cup.findByIdAndDelete(req.params.id);
        if (!deletedCup) {
            return res.status(404).json({ error: "Cup is not found" });
        }
        res.status(200).json({ message: "Cup is deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting cup" });
    }
});

//module.exports = router;
export default router;

