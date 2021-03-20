const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Donor = new Schema({
    name: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    donationDate: [{ type: Date, required: true }],
    bloodGroup: { type: String, required: true },
    donationAmount: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Donor', Donor);