import express from 'express';
const router = express.Router();
import Review from "../models/Review.mjs";
import { reviews } from "../data/reviews.mjs";



// Define routes here

// creating function to post insert data to the collection
async function insertReviewData () {
    const existingReviews = await Review.countDocuments();
    if (existingReviews > 0) {
        console.log ("Reviews data are already here, so not inserting now.")
        return;
    }
    else {
    const result = await Review.insertMany(reviews);
    console.log(`${result.length} reviews data have been inserted successfully.`);
    }
}

if (process.env.NODE_ENV !== "production") {
    insertReviewData();
}

// GET /api/reviews/ Retrieve all reviews data
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving cups reviews data" });
    }
});


// GET /api/reviews/:id/ Retrieve a review data by its brand name
router.get("/:brand_name", async (req, res) => {
    try {
        const review = await Review.find({brand_name: req.params.brand_name });
        if (review.length === 0) {
            return res.status(404).json({ error: "Review data is not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving review data" });
    }
});




export default router;