const express = require('express');
const { update } = require('../models/donors.model');

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
        res.json({ message: `${donor.first_name}'s entry deleted` })
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});


//** POST REQUESTS
// add new entry
router.route('/add').post((req, res) => {
    console.log(req.body);
    const first_name = req.body.firstName;
    const middle_name = req.body.middleName;
    const last_name = req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const weight = req.body.weight;
    const bloodGroup = req.body.bloodGroup;
    const donationDate = req.body.donationDate;
    const donationAmount = req.body.donationAmount;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const address = req.body.address;

    const newDonor = new Donor({
        first_name,
        middle_name,
        last_name,
        dateOfBirth,
        gender,
        weight,
        bloodGroup,
        donationDate,
        donationAmount,
        phoneNumber,
        email,
        address
    });

    newDonor.save()
        .then(() => res.json({ message: `${newDonor.first_name} entry added` }))
        .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
});

// update a entry
router.route('/updateDetails/:id').post((req, res) => {
    Donor.findById(req.params.id)
        .then(donor => {
            let valueUpdated;
            donor[req.body]
            for(donorKeys in donor){
                for(updateKeys in req.body){
                    if(donorKeys === updateKeys){
                        if(donor[donorKeys] !== req.body[updateKeys]){
                            donor[donorKeys] = req.body[updateKeys];
                            // console.log(donor[donorKeys]);
                            valueUpdated = donorKeys;
                        } else if(donorKeys === 'donationDate'){
                            donor[donorKeys] = req.body[updateKeys];
                        }
                    }
                }
            }
            console.log(donor);
            donor.save()
                .then(() => res.json({message: `${donor.first_name}'s ${valueUpdated} updated` }))
                .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
            })
            .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
});

// update a entry
// router.route('/updateDetails/:id').post((req, res) => {
//     Donor.findById(req.params.id)
//         .then(donor => {
//             console.log(donor)
//             const dateArray =  donor.donationDate;
//             dateArray[0] = req.body.donationDate;
//             donor.name = req.body.name;
//             donor.dateOfBirth = req.body.dateOfBirth;
//             donor.gender = req.body.gender;
//             donor.weight = req.body.weight;
//             donor.bloodGroup = req.body.bloodGroup;
//             donor.donationDate = dateArray;
//             donor.donationAmount = req.body.donationAmount;
//             donor.phoneNumber = req.body.phoneNumber;
//             donor.email = req.body.email;
//             donor.address = req.body.address;
        

//             donor.save()
//                 .then(() => res.json({message: `${donor.name}'s entry updated` }))
//                 .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
//             })
//             .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
// });

router.route('/addDate/:id').post((req, res) => {
    Donor.findById(req.params.id)
        .then(donor => {
            // add new data
            donor.donationDate.push(req.body.donationDate);
            donor.weight = req.body.weight;
            donor.donationAmount += req.body.amount;
            return donor;
        })
        .then(donor => {
            // sorting dates from oldest to latest
            donor.donationDate.sort((a, b) => {
                return new Date(a)-new Date(b);
            });
            console.log(donor)
            // filtering if any dates are less than 3 months
            const lengthOfDonationDates = donor.donationDate.length;
            for(let i=0; i< lengthOfDonationDates; ++i){
                if(i===0) continue;
                const date1 = new Date(donor.donationDate[i-1]);
                const date2 = new Date(donor.donationDate[i]);
                let months = date2.getMonth()-date1.getMonth() + 12*(date2.getFullYear() - date1.getFullYear());
                if(date2.getDate() < date1.getDate()){
                    --months;
                }
                // if dates are less than 3 months it returns and data not saved in database
                if(months<3){
                    return res.json({ message: '3 Months Not Completed'});
                }
            }
            return donor;
        })
        .then(donor => {
            // save the data in database
            donor.save()
                .then(() => res.json({message: `New Donation Date added in ${donor.first_name} profile` }))
                .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
        })
        .catch(err => console.log(`Error: ${console.log(err)}`));
});

module.exports = router;