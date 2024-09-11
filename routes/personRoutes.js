const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const { jwtAuthMiddleware, generateToken } = require('./../jwt')


router.post('/signup', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");

        const token = generateToken(response.username)
        console.log("Token recieved is :", token)
        res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

});

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data Fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });

    }
})


router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const response = await Person.find({ work: workType })
            console.log("response fetched")
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: "Invalid work Type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put('/:person_id', async (req, res) => {
    try {
        const personId = req.params.person_id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return res.status(500).json({ error: "Person not Found" });
        }
        console.log("\nData Updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:person_id', async (req, res) => {
    try {
        const personId = req.params.person_id;

        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(500).json({ error: "Person not Found" });
        }
        console.log("\nData Deleted successfully");
        res.status(200).json({ message: "Person Deleted Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;