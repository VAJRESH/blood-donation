const express = require('express');

let Donor = require('../models/donors.model');
let router = express.Router();

//** GET REQUESTS
// get all entries
router.route('/').get((req, res) => {
    Donor.find({})
        .then(donor => res.json(donor))
        .catch(err => console.log(`Error: ${err}`));
});

// search for a single entry
router.route('/:id').get((req, res) => {
    Donor.findById(req.params.id)
        .then(donor => res.json(donor))
        .catch(err => console.log(`Error: ${err}`));
});


//** DELETE REQUESTS 
// delete a entry
router.route('/:id').delete((req, res) => {
    Donor.findByIdAndDelete(req.params.id).sort({ donationDate: 1})
    .then(donor => {
        res.json({ message: `${donor.first_name}'s entry deleted` })
    })
    .catch(err => console.log(`Error: ${err}`));
});

//** Helper Function
// it is used to save the data with same pattern in the database for consistency
function capitalizeFirstLetter(value){
    // return if the value is undefined mostly in case of middle name
    if(!value) return '';
    return value[0].toUpperCase()+ value.slice(1)
}

//** POST REQUESTS
// add new entry
router.route('/add').post((req, res) => {
    const first_name = capitalizeFirstLetter(req.body.firstName);
    const middle_name = capitalizeFirstLetter(req.body.middleName);
    const last_name = capitalizeFirstLetter(req.body.lastName);
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const weight = req.body.weight;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const address = req.body.address;
    const landmark = req.body.landmark;
    const city = capitalizeFirstLetter(req.body.city);
    const pinCode = req.body.pinCode;
    const bloodGroup = req.body.bloodGroup;
    const donationDate = req.body.donationDate;
    const donationAmount = req.body.donationAmount;

    const newDonor = new Donor({
        first_name, middle_name,
        last_name, dateOfBirth,
        gender, weight,
        phoneNumber, email,
        address, landmark,
        city, pinCode,
        bloodGroup, donationDate,
        donationAmount,
    });

    newDonor.save()
        .then(() => res.json({ message: `${newDonor.first_name} entry added` }))
        .catch(err => console.log(`Error: ${err}`));
});

// update a entry
router.route('/updateDetails/:id').post((req, res) => {
    Donor.findById(req.params.id)
        .then(donor => {
            let valueUpdated;
            // first loop for all the keys database donor object and 
            // second loop for all keys of received object and 
            // then check if the both objects value is matched for updating that particular value 
            for(donorKeys in donor){
                for(updateKeys in req.body){
                    if(donorKeys === updateKeys){
                        if(donor[donorKeys] !== req.body[updateKeys]){
                            donor[donorKeys] = req.body[updateKeys];
                            valueUpdated = donorKeys;
                        } else if(donorKeys === 'donationDate'){
                            donor[donorKeys] = req.body[updateKeys];
                        }
                    }
                }
            }

            donor.save()
                .then(() => res.json({message: `${donor.first_name}'s updated` }))
                .catch(err => console.log(`Error: ${err}`));
        })
        .catch(err => console.log(`Error: ${err}`));
});

router.route('/addDate/:id').post((req, res) => {
    Donor.findById(req.params.id)
        .then(donor => {
            // received data is added for further validation
            donor.donationDate.push(req.body.donationDate);
            donor.weight = req.body.weight;
            donor.donationAmount += req.body.amount;
            return donor;
        })
        .then(donor => {
            // sorting dates from oldest to latest for comparing the dates in order
            donor.donationDate.sort((a, b) => {
                return new Date(a)-new Date(b);
            });
            // filtering if any dates are less than 3 months because we can donate blood only after a gap of 3 months 
            const lengthOfDonationDates = donor.donationDate.length;
            for(let i=0; i< lengthOfDonationDates; ++i){
                if(i===0) continue;
                const date1 = new Date(donor.donationDate[i-1]);
                const date2 = new Date(donor.donationDate[i]);
                // gets total months difference between two dates
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
            // save the data in database if it is valid
            donor.save()
                .then(() => res.json({message: `New Donation Date added in ${donor.first_name} profile` }))
                .catch(err => res.status(400).json(`Error: ${console.log(err)}`));
        })
        .catch(err => console.log(`Error: ${console.log(err)}`));
});

module.exports = router;