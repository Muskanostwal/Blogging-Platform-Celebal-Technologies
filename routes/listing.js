const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// INDEX ROUTE
// router.get("/", wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
// }));
router.get("/", wrapAsync(async (req, res) => {
    const { category } = req.query;
    let allListings;

    if (category) {
        allListings = await Listing.find({ category });
    } else {
        allListings = await Listing.find({});
    }

    res.render("listings/index.ejs", { allListings });
}));

// NEW ROUTE
router.get("/new", isLoggedIn, wrapAsync((req, res) => {
    console.log(req.user);
    const categories = ["Technology","Education","PersonalGrowth","Lifestyle","Finance","Entertainment","News","Others"];
    res.render("listings/new.ejs", { categories });
    // res.render("listings/new.ejs");
}));

// CREATE ROUTE
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}));

// SHOW ROUTE
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing Not exists");
        return res.redirect("/listings"); 
    }

    res.render("listings/show.ejs", { listing });
}));

// EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing Not exists");
        return res.redirect("/listings"); 
    }
    const categories = ["Technology","Education","PersonalGrowth","Lifestyle","Finance","Entertainment","News","Others"];
    res.render("listings/edit.ejs", { listing, categories });
}));

// UPDATE ROUTE
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Edited Successfully");
    res.redirect(`/listings/${id}`);
}));

// DELETE ROUTE
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully");
    res.redirect("/listings");
}));

module.exports = router;
