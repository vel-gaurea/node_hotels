const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Data Fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/', async (req, res) => {
    try {
        const dataItem = req.body
        const newMenu = new MenuItem(dataItem);
        const resp = await newMenu.save();
        console.log("\nData Saved");
        res.status(200).json(resp);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server Error" })

    }
})

router.get('/:tastetype', async (req, res) => {
    try {
        const tastetype = req.params.tastetype;
        if (tastetype == "Spicy" || tastetype == "Sweet" || tastetype == "Sour") {
            const response = await MenuItem.find({ taste: tastetype })
            console.log("response fetched")
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: "Invalid taste Type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;