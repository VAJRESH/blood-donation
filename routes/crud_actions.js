const express = require('express');

let Donor = require('../models/donors.model');
let router = express.Router();

// const capitalizeFirstLetter = name => {}

//** GET REQUESTS
// get all entries
router.route('/').get((req, res) => {
    Donor.find({})
        .then(donor => res.json(donor))
        .catch(err => res.status(400).json('Error: ' + err));
});

// search for a single entry
router.route('/:id').get((req, res) => {
    Donor.findById(req.params.id)
        .then(donor => res.json(donor))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


//** DELETE REQUESTS 
// delete a entry
router.route('/:id').delete((req, res) => {
    Donor.findByIdAndDelete(req.params.id).sort({ donationDate: 1})
    .then(donor => {
        res.json({ message: `${donor.name}'s entry deleted` })
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});


//** POST REQUESTS
// add new entry
router.route('/add').post((req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const weight = req.body.weight;
    const bloodGroup = req.body.bloodGroup;
    const donationDate = req.body.donationDate;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const address = req.body.address;

    const newDonor = new Donor({
        name,
        dateOfBirth,
        gender,
        weight,
        bloodGroup,
        donationDate,
        phoneNumber,
        email,
        address
    });

    newDonor.save()
        .then(() => res.json({ message: `${newDonor.name} entry added` }))
        .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
});

// update a entry
router.route('/updateDetails/:id').post((req, res) => {
    Donor.findById(req.params.id)
        .then(donor => {
            console.log(donor)
            const dateArray =  donor.donationDate;
            dateArray[0] = req.body.donationDate;
            donor.name = req.body.name;
            donor.dateOfBirth = req.body.dateOfBirth;
            donor.gender = req.body.gender;
            donor.weight = req.body.weight;
            donor.bloodGroup = req.body.bloodGroup;
            donor.donationDate = dateArray;
            donor.phoneNumber = req.body.phoneNumber;
            donor.email = req.body.email;
            donor.address = req.body.address;
        

            donor.save()
                .then(() => res.json({message: `${donor.name}'s entry updated` }))
                .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
            })
            .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
});
router.route('/addDate/:id').post((req, res) => {
    Donor.findById(req.params.id)
        .then(donor => {
            donor.donationDate.push(req.body.donationDate);
        
            donor.save()
                .then(() => res.json({message: `New Donation Date added in ${donor.name} profile` }))
                .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
            })
            .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
});

module.exports = router;