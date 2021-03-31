const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Donor = new Schema({
    first_name: { type: String, required: true, trim: true },
    middle_name: { type: String, trim: true },
    last_name: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    pinCode: { type: Number, required: true },
    donationDate: [{ type: Date }],
    bloodGroup: { type: String, required: true },
    donationAmount: { type: Number },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Donor', Donor);